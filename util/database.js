const Sequelize =require('sequelize');
const sequelize=new Sequelize('node-completenew','root','password',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;