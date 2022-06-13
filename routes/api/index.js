const express = require('express');
const router = express.Router();
const prouctController = require('../../controllers/product');
const manufacturerController = require('../../controllers/manufacturer');

router.get('/manufacturers',manufacturerController.all);
router.get('/manufacturers/:id',manufacturerController.byId);
router.post('/manufacturers',manufacturerController.create);
router.put('/manufacturers/:id',manufacturerController.update);
router.delete('/manufacturers/:id',manufacturerController.remove);

router.get('/products',prouctController.all);
router.get('/products/:id',prouctController.byId);
router.post('/products',prouctController.create);
router.put('/products/:id',prouctController.update);
router.delete('/products/:id',prouctController.remove);

module.exports = router;

// GET /manufacturers 获取所有的制造商
// GET /manufacturers/:id 获取单个制造商，这里 :id 代表动态路由，用于匹配任意字符串
// POST /manufacturers 用户创建单个制造商
// PUT /manufacturers/:id 用于修改单个制造商
// DELETE /manufacturers/:id 用于删除单个制造商