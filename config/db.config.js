// ININTIALIZE DATABASE

module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'kien12a9',
    DB: 'nodejs_pagination_1',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        accquire: 30000,
        idle: 10000
    }
};