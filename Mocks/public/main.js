const socket = io.connect();

const agregarBtn = document.getElementById('agregarBtn');

agregarBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('productTitle').value,
        price: document.getElementById('productPrice').value,
        thumbnail: document.getElementById('productImg').value
    }
    document.getElementById('addForm').reset();
    socket.emit('add_product', data)
});

socket.on('all_products', products => {
    document.getElementById('list').innerHTML = ''
    products.forEach(producto => {
        document.getElementById('list').innerHTML += `
        <div class="row">
            <div class="col d-flex align-items-center d-flex align-items-center justify-content-center">
            <p>${producto.title}</p>
            </div>
            <div class="col d-flex align-items-center d-flex align-items-center justify-content-center">
            <p>${producto.price}</p>
            </div>
            <div class="col d-flex align-items-center d-flex align-items-center justify-content-center">
            <img class="img-thumbnail" src="${producto.thumbnail}" alt="${producto.title}" style="width: 100px">
            </div>
        </div>
        `
    })
});

const chatBtn = document.getElementById('enviar');

chatBtn?.addEventListener("click", () => {
    const date = new Date()
    const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const data = {
        email: document.getElementById("emailInput").value,
        date: fecha,
        message: document.getElementById("mensaje").value
    }
    document.getElementById('mensaje').value = ''
    socket.emit('new_message', data);
})

socket.on('all_messages', chat => {
    document.getElementById('chat').innerHTML = '';
    chat.forEach(mensaje => {
        document.getElementById('chat').innerHTML += `
        <div>
            <span style="color: blue">${mensaje.email}</span>
            <span style="color: red">[${mensaje.date}]</span>
            <span style="color: green">: ${mensaje.message}</span>
        </div>
        `
    });
});