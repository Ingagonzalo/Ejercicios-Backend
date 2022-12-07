const socket = io();
const productForm = document.getElementById("productForm");
const productInput = document.getElementById("nameProduct");
const priceInput = document.getElementById("price");
const imgInput = document.getElementById("imgUrl");
const listProducts = document.getElementById("listProducts");

// Se define la funcion que envia mensajes
const sendProduct = (productInfo) => {
  // Emitiendo el evento "product:info" para mandar la informacion del producto al back a traves de websocket
  socket.emit("product:info", productInfo);
};

const renderProduct = (productData) => {
  const html = productData.map((productInfo) => {
    console.log(productInfo);
    return `
   
             <li>
              <span>${productInfo.name}</span>
              <span>${productInfo.price}</span>
              <img src=${productInfo.thumbnail} />
            </li>`;
  });

  listProducts.innerHTML = html.join(" ");
};

// Definimos la funcion submit handler, se ejecuta cuando se dispara el evento submit del form
const submitHandler = (event) => {
  //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
  event.preventDefault();

  // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
  const productInfo = {
    name: productInput.value,
    price: priceInput.value,
    thumbnail: imgInput.value,
  };

  // Ejecutamos la funcion sendProduct() que la encargada de enviar el profucto al back pasandole como parametro la informacion del mensaje
  sendProduct(productInfo);

  // Vaciamos el formulario de productos
  productForm.reset();
};

productForm.addEventListener("submit", submitHandler);

socket.on("server:product", renderProduct);
