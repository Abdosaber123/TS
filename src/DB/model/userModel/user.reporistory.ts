import { RootFilterQuery } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { AbstractReporistory } from "../../abstract.reporesoritory";
import { User } from "./user.model";

export class UserRepository extends AbstractReporistory<IUser> {
    constructor(){
        super(User)
    }
    async getAlluser (filter:RootFilterQuery<IUser>){
      await  this.model.findOne(filter)
    }
}