﻿var mongoose = require('mongoose') ;     // 定义使用组件
var Schema = mongoose.Schema ;  // 创建模式
var UserSchema = new Schema({
        userid : String ,
        name : String ,
        password : String
}) ;    // 定义了一个新的模式，但是此模式还未和users集合有关联
module.exports.User = mongoose.model('User',UserSchema) ;       // 与Users表关联