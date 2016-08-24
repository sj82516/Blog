const Sequelize = require("sequelize");
const crypto = require("crypto");
const hmac = crypto.createHmac('sha256', 'a secret');

let hash_key = "this_is_test";

let sequelize = new Sequelize('test', 'root', 'test1', {
    host: '192.168.99.100',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    logging: false
});

var User = sequelize.define('user', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  account: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set: function(val) {
      hmac.update(val);
      this.setDataValue('password', hmac.digest('hex'));
    }
  },
  createAtTime:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  firstname:{
    type: Sequelize.STRING,
    field: 'first_name',
    validate:{
      len:{
        args:[2,10],
        msg:"length of firstname is not allowed"
      }
    },
    get : function()  {
      return this.getDataValue('firstname').toUpperCase();
    },
  },
  lastname:{
    type: Sequelize.STRING,
    validate:{
      notEmpty: true
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
  getterMethods   : {
    fullName       : function()  { return this.firstname + ' ' + this.lastname }
  },
  setterMethods   : {
    fullName       : function(value) {
        var names = value.split(' ');
        this.setDataValue('firstname', names.slice(0, -1).join(' '));
        this.setDataValue('lastname', names.slice(-1).join(' '));
    },
  }
});

User.sync({force: true})
.then(()=>{
  return User.create({account:'test1',password:'test1',firstname:'cheng',lastname:'yj'});
}).then((user)=>{
  console.log(user.get('firstname'));
  console.log(user.get('fullName'));
  user.set('fullName', 'hello world');
  console.log(user.get('fullName'));
  user.save();
}).catch((err)=>{
  console.log(err);
});
