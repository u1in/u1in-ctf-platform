let Sequelize = require('sequelize');
let { DATABASE_DIALECT, DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_FORCE} = require('../config/config');
let mode = {
    force: DATABASE_FORCE,
};
let db = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_URL,
    dialect: DATABASE_DIALECT,
    timezone: '+08:00',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});

let Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'username',
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password',
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'level',
        defaultValue: 1,
    },
});

Users.sync(mode).then(() => console.log('SUCCESS CREATE TABLE Users')).catch(err => console.log(err));

let Challenges = db.define('challenges', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    type: {
        type: Sequelize.STRING,
        field: 'type',
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false,
    },
    desc: {
        type: Sequelize.TEXT,
        field: 'desc',
    },
    flag: {
        type: Sequelize.STRING,
        field: 'flag',
        allowNull: false,
    },
    fb: {
        type: Sequelize.FLOAT,
        field: 'fb',
        allowNull: false,
    },
    avatar: {
        type: Sequelize.STRING,
        field: 'avatar',
    },
    solves: {
        type: Sequelize.INTEGER,
        field: 'solves',
        defaultValue: 0,
    },
    score: {
        type: Sequelize.FLOAT,
        field: 'score',
    },
    base: {
        type: Sequelize.INTEGER,
        field: 'base',
        allowNull: false,
    },
})

Challenges.sync(mode).then(() => console.log('SUCCESS CREATE TABLE Challenges')).catch(err => console.log(err));

let Submit = db.define('submit', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    ip: {
        type: Sequelize.STRING,
        field: 'ip',
    },
    user_id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    challenge_id: {
        type: Sequelize.INTEGER,
        field: 'challenge_id',
        allowNull: false,
    },
    flag: {
        type: Sequelize.STRING,
        field: 'flag',
        allowNull: false,
    },
    state: {
        type: Sequelize.INTEGER,
        field: 'state',
    },
})

Submit.sync(mode).then(() => console.log('SUCCESS CREATE TABLE Submit')).catch(err => console.log(err));

module.exports = {
    db,
    Users,
    Challenges,
    Submit
};