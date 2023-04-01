const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    mail: {type: DataTypes.STRING, unique: true, allowNull: false},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
})

const University = sequelize.define('university', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
});

const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});

const CodeCompil = sequelize.define('code_compil', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
});


const Code = sequelize.define('code', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
});

const ShareCode = sequelize.define('share_code', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING},
    teacherAnswer: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING, allowNull: false},
});

University.hasMany(User);
User.belongsTo(University);

University.hasMany(Group);
Group.belongsTo(University);

Group.hasMany(User);
User.belongsTo(Group);

User.hasMany(ShareCode, {
    foreignKey: 'studentId',
});
ShareCode.belongsTo(User);

User.hasMany(ShareCode, {
    foreignKey: 'teacherId',
});
ShareCode.belongsTo(User);

User.hasMany(Group, {
    foreignKey: 'teacherId',
})
Group.belongsTo(User);

User.hasMany(Code);
Code.belongsTo(User);

Code.hasMany(ShareCode);
ShareCode.belongsTo(Code);

Code.hasMany(CodeCompil);
CodeCompil.belongsTo(Code);