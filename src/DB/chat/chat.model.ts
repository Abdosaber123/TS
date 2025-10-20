import { model } from "mongoose";
import { chateSchema } from "./chatSchema";

export const Chat = model("Chat" ,chateSchema)