
const { Sequelize } = require('sequelize');
var sequelize=new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: './data/database.sqlite'
    });

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database reset successful');
        PersonSchema.create({'name': 'john',
        'surname':'Doe', 'job':'IT'})
    })
    .catch((error) => {
        console.error('Error resetting database:', error);
    });
    


var PersonSchema = sequelize.define("Person", {
    id: {type:  Sequelize.INTEGER, autoIncrement: true,
    primaryKey: true},
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    job: Sequelize.STRING
    },{
});



module.exports = {sequelize, PersonSchema};