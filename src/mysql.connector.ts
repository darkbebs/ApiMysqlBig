import { createPool, Pool } from 'mysql';
import { DATA_SOURCES } from './vars.config';
const dataSource = DATA_SOURCES.mySqlDataSource;

interface Connection {
    database: string,
    pool: Pool
}

let connections: Connection[] = [];

function connectionExists(arr: Connection[], database: string) {
    return arr.some(function(el) {
      return el.database === database;
    }); 
  }

/**
 * generates pool connection to be used throughout the app
 */
export const init = (database: string): Pool | null => {
    try {
        if(!connectionExists(connections, database)) {
            var pool = createPool({
                host: dataSource.DB_HOST,
                user: dataSource.DB_USER,
                password: dataSource.DB_PASSWORD,
                database: database,
            });
            connections.push({ database: database, pool: pool });
            return pool;
        }
        else {
            return connections.find(x => x.database === database)!.pool;
        }
        console.log(connections);
    } catch (error) {
        console.error('[mysql.connector][init][Error]: ', error);
        throw new Error('failed to initialized pool');
    }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute = <T>(database: string, query: string, params: string[] | Object): Promise<T> => {
    try {
        var pool = init(database);
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}