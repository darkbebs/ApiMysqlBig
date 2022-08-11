import 'dotenv/config'
const clc = require('cli-color');
require('console-stamp')(console, '[HH:MM:ss]');

const log = console.log;

if (!process.env.BIG_HOST && !process.env.BIG_PASSWORD) {
  log(clc.yellow('As variaveis de ambiente BIG_HOST e BIG_PASSWORD precisam ser criadas.'));
  process.exit(1);
}
else 
{
  var host = process.env.BIG_HOST;
  var user = process.env.BIG_USER ?? 'root';
  var password = process.env.BIG_PASSWORD;
  var port = process.env.BIG_PORT ?? 3306;
}

export const DATA_SOURCES = {
    mySqlDataSource: {
      DB_HOST: host,
      DB_USER: user,
      DB_PASSWORD: password,
      DB_PORT: port,
      DB_DATABASE: 'mysql'
    }
  };