const messageForm = document.getElementById("messageForm");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const chat = document.getElementById("listMessage")

// Definimos la funcion que envia mensajes
const sendMessage = (productInfo) => {
  // Emitiendo el evento "product:info" para mandar la informacion del producto al back a traves de websocket
  socket.emit("chat:messageInfo", productInfo);
};

const renderMessage = (chatData) => {
  const date = new Date().toLocaleString("es-AR");
  const html = chatData.map((messageInfo) => {
    console.log(messageInfo);
    return `<li>
              <p>${messageInfo.email}<span>[${date}]</span>:
              <br><span id=message>${messageInfo.message}</span>
              </p>
            </li>`;
  });

  chat.innerHTML = html.join(" ");
};

// Definimos la funcion submit handler, se ejecuta cuando se dispara el evento submit del form
const submitHandlerMessage = (event) => {
  //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
  event.preventDefault();

  // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
  const messageInfo = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Ejecutamos la funcion sendProduct() que la encargada de enviar el profucto al back pasandole como parametro la informacion del mensaje
  sendMessage(messageInfo);

  messageInput.value = "";
};

messageForm.addEventListener("submit", submitHandlerMessage);

socket.on("server:message", renderMessage);
