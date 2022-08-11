import express from 'express';
import compression from 'compression';
import * as path from 'path';
import * as MySQLConnector from './mysql.connector';
import bodyParser from 'body-parser';
require('console-stamp')(console, '[HH:MM:ss]');
import 'dotenv/config';
import basicAuth from'express-basic-auth';

const clc = require('cli-color');
const app = express();
const port = process.env.APP_PORT ?? 3000;
const jsonParser = bodyParser.json();
const log = console.log;
const password = process.env.REST_PASSWORD ?? 'admin';


app.use(basicAuth({
    users: { 'admin': password },
}))

app.use(compression());


app.get('^/:database', async function (req, res, next) {
    try {
        var result = await MySQLConnector.execute(req.params.database, `show table status`, []);
        log(clc.yellow('Request database info'));
        res.status(200).send({
            result: result,
        }) 
    } catch (error) {
        res.status(500).send({
            error: error,
        })
    }
});

app.post('^/:database/query', jsonParser , async function (req, res, next) {
    try {
        log(clc.yellow('Query: ') + clc.white(req.body.sql));
        var result = await MySQLConnector.execute(req.params.database, req.body.sql, []);
        res.status(200).send({
            result: result,
        }) 

    } catch (error) {
        res.status(500).send({
            error: error,
        })
    }
}); 



app.get('/', (request, res) => {
    res.status(200).send({
        title: "Api Rest SistemaBig",
        autor: "Cleiton Waldemar Ribeiro <cleiton@varejointeligente.tech>",
        version: "0.0.1"
    });
});


app.use(function(req, res){
    res.send(404);
});


app.listen(port);
log(clc.white('---------------------------------------------------------------------------------------------------'));
log(clc.yellow('Listen on port ') + clc.green(port));
log(clc.yellow('Default User: ') + clc.green('admin'));
log(clc.yellow('Password: ') + clc.green(password));

if(password == 'admin'){
    log(clc.white('---------------------------------------------------------------------------------------------------'));
    log(clc.yellow('Para trocar a senha padrão crie uma váriavel de ambiente "REST_PASSWORD" com o valor da nova senha'));
}