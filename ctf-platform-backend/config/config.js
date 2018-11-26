/**
 * 数据库类型
 * 具体参数可查阅文档
 * http://docs.sequelizejs.com/manual/installation/usage.html#dialects
 */
const DATABASE_DIALECT = 'mysql';

/**
 * 数据库地址
 */
const DATABASE_URL = 'localhost';

/**
 * 数据库账号名
 */
const DATABASE_USERNAME = 'root';

/**
 * 数据库密码
 */
const DATABASE_PASSWORD = 'ulinulin';

/**
 * 数据库名
 */
const DATABASE_NAME = 'ctf';

/**
 * 数据库强制创建模式
 * true为若存在同名数据库则覆盖
 * false为若存在同名数据库则直接使用
 * 建议初次使用true生成数据库
 */
const DATABASE_FORCE = true;

module.exports = {
    DATABASE_DIALECT,
    DATABASE_URL,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_FORCE,
}