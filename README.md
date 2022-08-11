# REST API - SistemaBig

Essa é uma Api para facilitar o acesso ao Mysql 4.0 do SistemaBig.

## Váriaveis de ambiente disponiveis

    BIG_HOST *Endereço Mysql SistemaBig*
    BIG_USER *Usuário Mysql SistemaBig*
    BIG_PASSWORD *Senha Mysql SistemaBig*
    BIG_PORT *Porta Mysql SistemaBig*
    APP_PORT *Porta em que a Api irá subir*
    REST_PASSWORD *Senha para acesso da Api*

## Instalação

    npm install
    npm install -g pm2
    npm install -g pm2-windows-startup
    pm2 start ApiMysqlBig.config.js
    pm2 save

### Request

`GET /gerente/`

    curl -i -H 'Accept: application/json' http://localhost:5000/gerente/ -u "admin:admin"

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 543464
    ETag: W/"84ae8-SJP6OjoJmSewrbFuzl2GidxNfEM"
    Vary: Accept-Encoding
    Date: Thu, 11 Aug 2022 23:04:17 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5


    {
    "result": [
        {
        "Name": "acertaestoq_ent",
        "Type": "MyISAM",
        "Row_format": "Dynamic",
        "Rows": 0,
        "Avg_row_length": 0,
        "Data_length": 0,
        "Max_data_length": 4294967295,
        "Index_length": 1024,
        "Data_free": 0,
        "Auto_increment": 1,
        "Create_time": "2010-07-16T18:52:33.000Z",
        "Update_time": "2019-11-23T13:13:15.000Z",
        "Check_time": "2022-07-28T13:23:27.000Z",
        "Create_options": "",
        "Comment": ""
        }
        ....
    ]
    }

## Executando um comando sql

### Request

`POST /gerente/query`

    curl -i -X POST -H "Content-Type: application/json" http://localhost:5000/gerente/query -u "admin:admin" -d '{"sql":"select usuario_id, nome from usuario limit 1"}'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    ETag: W/"2b-0koRy0IV35DfIHYALRTnn5QeZn8"
    Vary: Accept-Encoding
    Date: Thu, 11 Aug 2022 23:11:26 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"result":[{"usuario_id":1,"nome":"CLEITON WALDEMAR RIBEIRO DE SOUZA"}]}⏎

