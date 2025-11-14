const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://dindaarindam000:GNLgdxhHfDmJnsI0@cluster0.iydcqgy.mongodb.net/todoapp2");

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User=new Schema({
    email:String,
    password:String,
    name: String
})

const Todo=new Schema({
    userId:ObjectId,
    title:String,
    description:String,
    completed:Boolean
})


const UserModel=mongoose.model("users",User);
const TodoModel=mongoose.model("todos",Todo);

module.exports={UserModel,TodoModel};