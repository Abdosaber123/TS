import { model } from "mongoose";
import { userShema } from "./user.schema";
import { IUser } from "../../../utils/common/interface";

export const User = model<IUser>("User" , userShema)