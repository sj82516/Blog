const Sequelize = require("sequelize");

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

let Pokemon = sequelize.define('pokemon',{
    name:{
        type:Sequelize.STRING
    },
    level:{
        type:Sequelize.INTEGER,
        defaultValue: 5
    },
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        autoIncrement: true
    }
},{
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    defaultScope:{
        where:{
            level:{
                $gt:6
            }
        }
    }
});

let Owner = sequelize.define('owner',{
    name:{
        type:Sequelize.STRING
    },
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        autoIncrement: true
    }
},{
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

let Skill = sequelize.define('skill',{
    name:{
        type:Sequelize.STRING
    },
    damage:{
        type:Sequelize.INTEGER,
        defaultValue: 5
    },
    id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        autoIncrement: true
    }
},{
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

Owner.belongsTo(Pokemon, {as:'RootPokeMon', foreignKeyContraints:false, constraints: false});
Pokemon.belongsTo(Owner,{foreignKey: 'owner_id', foreignKeyContraints:false, constraints: false});
Owner.hasMany(Pokemon,{foreignKey: 'owner_id', foreignKeyContraints:false, constraints: false});

Pokemon.belongsToMany(Skill,{through: 'PokemonSkills', foreignKeyContraints:false, constraints: false});
Skill.belongsToMany(Pokemon,{through: 'PokemonSkills', foreignKeyContraints:false, constraints: false});

sequelize.sync({force:true}).then(()=>{
    return Promise.all([Owner.create({name:'小智'}),
                        Owner.create({name:'小茂'}),
                        Pokemon.create({name:'皮卡丘',level:'10'}),
                        Pokemon.create({name:'卡比獸',level:'17'}),
                        Pokemon.create({name:'水箭龜',level:'8'}),
                        Pokemon.create({name:'噴火龍'}),
                        Pokemon.create({name:'妙蛙花'}),
                        Pokemon.create({name:'比雕'}),
                        Skill.create({name:'飛行'}),
                        Skill.create({name:'閃電'}),
                        Skill.create({name:'噴火'}),
                        Skill.create({name:'撞擊'}),
                        Skill.create({name:'叫聲'}),
                    ]);
}).then((value)=>{
    //綁定飼主與神奇寶貝
    return Promise.all([value[0].setRootPokeMon(value[2]),
                        value[2].setOwner(value[0]),
                        value[3].setOwner(value[0]),
                        value[1].setRootPokeMon(value[4]),
                        value[4].setOwner(value[1]),
                        value[5].setOwner(value[1]),
                        value[6].setOwner(value[1]),
                        value[7].setOwner(value[1]),
                        value[8].setPokemons([value[5],value[7]]),
                        value[9].addPokemon(value[2]),
                        value[3].setSkills([value[11],value[12]])
                    ]);
}).then((val)=>{
    console.log(val);
    //取得訓練家小智旗下所有高於六等的神奇寶貝(見scope)
    return val[0].getPokemons()
}).then((val)=>{
    console.log(val);
});
