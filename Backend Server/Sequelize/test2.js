const Sequelize = require("sequelize");
const Moment = require("moment");

let hash_key = "this_is_test";

let sequelize = new Sequelize('test', 'root', 'test1', {
    host: '192.168.99.100',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        charset: 'utf8',
    }
});

let Item = sequelize.define('items', {
    item_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING
    },
    price:{
        type:Sequelize.INTEGER
    },
    onShelfDate:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue: true
    },
    category:{
        type:Sequelize.ENUM('food','monster','skill')
    }
},{
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    scopes:{
        outdate:{
            //bug!
            where:sequelize.where(sequelize.fn('date_format', sequelize.col('onShelfDate'), '%Y'),{$lt:'2016'})
        },
        delete:{
            where:{
                status:false
            }
        },
        priceHigher:function(value){
            return {
                where: {
                    price: {
                        $gte: value
                    }
                }
            }
        }
    }
});

Item.sync({force:true}).then(()=>{
    let item = Item.build({name:'比雕',price:'250',onShelfDate:'2014-07-11',status:'1',category:'monster'})
    return item.save();
}).then((item)=>{
    return Item.create({name:'卡比獸',price:'30',onShelfDate:'2015-07-11',status:'1',category:'monster'});
})
.then((item)=>{
    return Item.bulkCreate([
        {name:'皮卡丘',price:'25',onShelfDate:'2015-07-11',status:'1',category:'monster'},
        {name:'水箭龜',price:'45',onShelfDate:'2016-07-11',status:'1',category:'monster'},
        {name:'噴火龍',price:'100',onShelfDate:'2015-07-11',status:'1',category:'monster'},
        {name:'妙蛙花',price:'80',onShelfDate:'2016-07-11',status:'1',category:'monster'},
        {name:'噴射火焰',price:'3000',onShelfDate:'2016-07-11',status:'1',category:'skill'},
        {name:'水砲',price:'2800',onShelfDate:'2016-07-11',status:'1',category:'skill'},
        {name:'十萬伏特',price:'5000',onShelfDate:'2015-07-11',status:'1',category:'skill'},
        {name:'神奇軟糖',price:'9800',onShelfDate:'2015-07-11',status:'1',category:'food'},
        {name:'好傷藥',price:'200',onShelfDate:'2016-07-11',status:'1',category:'food'},
        {name:'超級好傷藥',price:'500',onShelfDate:'2016-07-11',status:'1',category:'food'},
        {name:'蜂蜜',price:'250',onShelfDate:'2016-07-11',status:'1',category:'food'},
    ]);
}).then((items)=>{
    //價格高於50元的神奇寶貝，並且只顯示名稱和價格
    return Item.findAll({
        where:{
            price:{
                $gt: 50
            },
            category:{
                $like: 'monster'
            }
        },
        order:'name DESC',
        attributes: ['name','price']
    })
}).then((items)=>{
    console.log(JSON.stringify(items));

    //找出2015上架的商品，並計算價格總和
    return Item.sum('price',{
        where:sequelize.where(sequelize.fn('date_format', sequelize.col('onShelfDate'), '%Y'),{$gt:'2014'})
    });
}).then((price)=>{
    console.log(price);

    //將"食物"商品狀態更新為 false
    return Item.update(
        { status:false},
        { where:{ category:'food' } }
    )
}).then(()=>{
    console.log('destroy finished');

    //使用scope更新過期商品
}).then((affectedAccount)=>{
    console.log(affectedAccount);

    //使用scope顯示價格高於X元的商品
    return Item.scope({ method: ['priceHigher', 2000]}).findAll();
}).then((items)=>{
    console.log(items);

    //使用scope刪除status為false的商品
    return Item.scope('delete').destroy({where:{name:'卡比獸'}});
}).then(()=>{
    console.log('finished');
}).catch((err)=>{
    console.log(err);
})
