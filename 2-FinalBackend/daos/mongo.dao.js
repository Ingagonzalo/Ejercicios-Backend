class MongoDao{
    constructor(collection){
        this.collection= collection;
    }
    async getAll(){
        try{
            const response = await this.collection.find();
            return response
            
        }catch (err){
            throw new Error("error")
        }
    }
        async getById(id){
        try{
            const response = await this.collection.findById(id);
            return response
        }catch (err){
            throw new Error("error")
        }
    }
    async create(resource){
        try{
            const response = await this.collection.create(resource);
            return response
        }catch (err){
            throw new Error("error")
        }
    }
        async update(resource, id){
        try{
            const response = await this.collection.findByIdAndUpdate(id, resource);
            return response
        }catch (err){
            throw new Error("error")
        }
    }
    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);

            return response;
        } catch (err) {
            throw new Error("Error");
        }
    }
}

