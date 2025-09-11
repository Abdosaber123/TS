import { RootFilterQuery } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { AbstractReporistory } from "../../abstract.reporesoritory";
import { User } from "./user.model";

export class UserRepository extends AbstractReporistory<IUser> {
    constructor(){
        super(User)
    }
    getAlluser (filter:RootFilterQuery<IUser>){
        this.model.findOne(filter)
    }
}