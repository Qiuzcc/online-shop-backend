const Model = require('../model');
const { Product } = Model;       //解构赋值

const productController = {
    all(req,res){
        Product.find({})
        .populate('manufacturer')
        .exec((err,products)=>res.json(products));
    },
    byId(req,res){
        
    },
    create(req,res){

    },
    update(req,res){

    },
    remove(req,res){

    }
}

module.exports = productController;    //导出控制器