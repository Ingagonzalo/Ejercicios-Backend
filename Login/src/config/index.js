import { config } from "dotenv";
config();

export const configObject = {
    mongoUrl: process.env.MONGO_URL,
};