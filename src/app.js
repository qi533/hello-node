const express = require('express');
// console.log(1)
const app = express();

const models = require('../models');
//中间件
// function demo_middleware(err,req,res,next){ 
//     console.log(err,res)
// }

// /test?name=2222
function valid_name_middleware(req, res, next) {
    let { name } = req.query;
    if (!name || name.lenght) {
        res.json({
            message: '缺少name参数'
        })
    }
    else {
        next();
    }
}

// app.all('*',valid_name_middleware)

app.get('/list', async (req, res) => {
    const {Op} = require("sequelize");
    const list = await models.Users.findAll({
        where: { [Op.and]: [{id: {[Op.between]: [3, 6] }},{id:{[Op.ne]:4}}]}
    })
    //const list2 = await models.Users.findAll()
    // res.json({
    //     list,
    //     list2
    // })).then(
    // let list2
    // models.Users.findAll().then((data) => {
    //     list2 = data
    //     console.log(list2)

    // })
    res.json({
        list
    })
})

app.get('/create', [valid_name_middleware], async (req, res) => {
    const { name, password } = req.query;
    const user = await models.Users.create({
        name,
        password,
        sex: 1
    })
    console.log(req.query)
    res.json({
        user,
        message: "创建成功"
    })
})

app.listen(3000, () => {
    console.log('启动成功')
})