const product = require('../module/product')
const router = require('../routes/products')

const getAllProductsStatic = async (req, res) => {
    //skip(1) == show the data start wtih second item
    const products = await product.find({}).sort('name').select('name price').limit(10).skip(1)
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query

    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=<': '$lte',
            '<': '$lt',
            '=': '$eq',
        }
        const ergEx = /\b(<|>|=|<=|>=)\b/g
        let filters = numericFilters.replace(regEx,(match)=> `-${operatorMap[match]}-`)
        console.log(filters)
    }
    

    // console.log(queryObject)
    let result = product.find(req.query)
    if (sort) {
        const sortlist = sort.split(',').join(' ')
        result = result.sort(sortlist)
    } else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // Because all the req.query is a string like '2' ************************

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)



    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}