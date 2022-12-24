import chatContainer from "./chatContainer.js";
import { chatOptions } from "./db/chatDB.js";
import productContainer from "./productContainer.js";
import { productsOptions } from "./db/productDB.js";

const clientChat = new chatContainer(chatOptions);
const clientProducts = new productContainer(productsOptions);

const createTableChat = async() => {
    await clientChat.createTableChat();
}

const createTableProducts = async() => {
    await clientProducts.createTableProducts();
}
createTableChat();
createTableProducts();