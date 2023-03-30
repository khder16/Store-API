require('dotenv').config()

const connectDB = require('./db/connect')

const product = require('./module/product')


const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.Mongo_URI)
        await product.deleteMany();
        await product.create(jsonProducts)
        console.log('Success!!!')
        process.exit(0)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()