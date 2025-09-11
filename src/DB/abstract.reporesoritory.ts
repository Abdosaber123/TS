import { Model, MongooseBaseQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export abstract class AbstractReporistory<T> {
    constructor(protected model: Model<T>){}
    async create(item: Partial <T>){
     const doc = new this.model(item)
     return await doc.save()
    }
    async exists (filter:RootFilterQuery<T> , projection? : ProjectionType<T> , option? : QueryOptions){
     return await  this.model.findOne(filter,projection , option)
    }
    async getOne (filter:RootFilterQuery<T> , projection? : ProjectionType<T> , option? : QueryOptions){
     return await  this.model.findOne(filter,projection , option)
    }
    async update (filter : RootFilterQuery<T> , update : Partial<T> , option : MongooseBaseQueryOptions){
     await this.model.updateOne(filter ,update ,option )
    }
    async delte (filter : RootFilterQuery<T> ){
        await this.model.deleteOne(filter )
    }
}