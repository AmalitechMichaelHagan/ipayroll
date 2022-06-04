const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"postgres",
    database:"ipayroll_db",
    host:"localhost:9000",
    port:5432
})

module.exports = pool;