import knex from 'knex';
import path from 'path';
const connection = knex({
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'database_sqlite'),
    },
    useNullAsDefault: true,

});

export default connection;

//migrations - historico de banco de dados

// create table points
// create table users



