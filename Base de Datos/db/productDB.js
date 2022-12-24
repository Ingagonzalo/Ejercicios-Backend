export const productsOptions = {
    client: 'mysql',
    connection: {
        host: process.env.HOST || 'localhost',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DATABASE || 'coder',
    }
}