const Model = require('../model');
const { Product } = Model;       //解构赋值

const productController = {
    all(req,res){
        Product.find({})
        .populate('manufacturer')
        .exec((err,products)=>{
            if(err) throw err;
            res.json(products)
        });
    },
    byId(req,res){
        const idParams = req.params.id;
        Product.findOne({_id:idParams})
        .populate('manufacturer')
        .exec((err,product)=>{
            if(err) throw err;
            res.json(product)
        });
    },
    create(req,res){
        const requestBody = req.body;
        const newProduct = new Product(requestBody);    //这里应该是利用了解构赋值
        newProduct.save((err,saved)=>{
            if(err) throw err;
            Product.findOne({_id:newProduct._id})
            .populate('manufacturer')
            .exec((err,product)=>{
                if(err) throw err;
                res.json(product)
            });
        })
    },
    update(req,res){
        const idParams = req.params.id;
        const product = req.body;
        Product.updateOne({_id:idParams},{...product},(err,updated)=>{  
            if(err) throw err;
            res.json(updated);          //...扩展操作符的作用，是把array（或集合，这里看来是集合）转成一个个单独的参数
        })
    },  
    remove(req,res){
        const idParams = req.params.id;
        Product.remove({_id:idParams},(err)=>res.json(idParams));
    }
}

module.exports = productController;    //导出控制器

// all()中，populate的作用是填充内容。populate('manufacturer')之前，Product中manufacturer属性的内容是_id
// 而使用populate('manufacturer')之后，_id的内容会被对应_id的对象的实际内容填充，也就是{_id,name}两个属性
/**
 const productSchema = Schema({
    _id: ObjectId,
    name: String,
    image: String,
    price: Number,
    description: String,
    manufacturer:{type:ObjectId,ref:'Manufacturer'}
});
const manufacturerSchema = Schema({
    _id:ObjectId,
    name:String,
});
 */
