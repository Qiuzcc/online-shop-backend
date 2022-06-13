const Model = require('../model');
const { Manufacturer } = Model;       //解构赋值

const manufacturerController = {
    all(req,res){
        Manufacturer.find({})         //集合为空，表示查询所有内容
        .exec((err,manufacturers)=> res.json(manufacturers));
    },
    byId(req,res){
        const idParams = req.params.id;
        Manufacturer
        .findOne({_id:idParams})
        .exec((err,manufacturer)=>res.json(manufacturer));
    },
    create(req,res){
        const requestBody = req.body;
        const newManufacturer = new Manufacturer(requestBody);

        newManufacturer.save((err,saved)=>{
            Manufacturer
            .findOne({_id:newManufacturer._id})
            .exec((err,manufacturer)=>res.json(manufacturer));
        })
    },
    update(req,res){
        const idParams = req.params.id;
        let manufacturer = req.body;

        Manufacturer.updateOne({_id:idParams},{...manufacturer},(err,updated)=>{
            res.json(updated);
        })
    },
    remove(req,res){
        const idParams = req.params.id;

        Manufacturer.findOne({_id:idParams}).remove((err,removed)=>res.json(idParams))
    }
}

module.exports = manufacturerController;    //导出控制器

// all 获取所有的制造商
// byId 获取单个制造商
// create 用户创建单个制造商
// update 用于修改单个制造商
// remove 用于删除单个制造商

// 这里有一个疑问？？ 为什么Manufacturer模型的ID属性要用'_id'，明明定义Model的时候定义的是'id'，这会不会造成一些错误bug
// 自己推测：应该是前面教程定义的时候错乱，_id下划线应该表示的是私有属性。

//一些改进
// create()部分，
// newManufacturer.save((err,saved)=>res.json(saved))
// removeb()部分，
// Manufacturer.remove({_id:idParams}), (err)=>res.json(idParams))
