import { chatOptions } from "../db/chatDB.js";
import chatContainer from "../chatContainer.js";

const client = new chatContainer(chatOptions);

const createTable = async () => {
    try {
        await client.createTableChat();
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const chatRead = async () => {
    try {
        const messages = await client.getMessages()
        return messages;
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const messageInsert = async(message) => {
    try {
        await client.saveMessage(message)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export const chatController = { createTable, chatRead, messageInsert }