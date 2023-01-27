import knexLib from 'knex';

export default class productContainer{
    constructor(config){
        this.knex = knexLib(config);
    }

    async createTableProducts(){
        return this.knex.schema.dropTableIfExists('productos').finally(() => {
            return this.knex.schema.createTable('productos', table => {
                table.increments('id').primary()
                table.string('title', 50).notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail').notNullable()
            })
        })
    }

    async saveProduct(product){
        try {
            return this.knex('productos').insert(product)
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    async getProductById(id){
        try {
            return this.knex('productos').select('id', 'title', 'price', 'thumbnail'). where({id: id})
        } catch (error) {
            console.error(`Error: ${error}`)        
        }
    }

    async getAllProducts(){
        try {
            return this.knex('productos').select('*')
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    async updateProductById(id, data){
        try {
            return this.knex('productos').where({id: id}).update(data)
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    async deleteProductById(id){
        try {
            return this.knex('productos').where({id: id}).del()
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    async deleteAllProducts(){
        try {
            return this.knex('productos').del()
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    async closeClient(){
        this.knex.destroy()
    }
}