# 设计

GraphQL + ES

目标：通过 GraphQL 实现对 ES 的增删改查



# 实现

```js
# webpack
npm install webpack-dev-server --save-dev / 版本问题 npm install webpack serve --save-dev
npm link webpack
npm i --save-dev html-webpack-plugin

# elasticsearch
npm install elasticsearch
```

## 部署es服务

docker部署一个 

file_elastic_kibana_latest.yml

```yml
version: '3.1'
services:
  kibana:
     image: docker.elastic.co/kibana/kibana:7.3.0
     ports:
         - 5601:5601
         
  elasticsearch:
     environment:
            - "discovery.type=single-node"
            - "MAX_CLAUSE_COUNT=4096"
            - "ES_JAVA_OPTS=-Xms512m -Xmx512m" 
     image: docker.elastic.co/elasticsearch/elasticsearch:7.3.0
     ports:
         - 9200:9200
```

```shell
docker-composer -f ./file_elastic_kibana_latest.yml up
```



## 连接ES

```javascript
/**
 * server.client.js
 */
const ElasticSearch = require('elasticsearch');

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */
const client = new ElasticSearch.Client({
  hosts: ['http://127.0.0.1:9200']
});

module.exports = client;
```

## apollo server

server.js 



## apollo resolver

server.graphql.js

构建schema：客户端可以读写的数据类型

resolver 可以选用 es



## 塞入数据

server.es.create.js

client已经连接了es服务，这里直接通过es client插入数据

```javascript
const client = require('./server.client');
const params = require('./json/es.settings-mappings');

client.indices.create(
  {
    index: "catalog",
    body: params
  },
  (error, response, status) => {
    if(!error) {
      console.info("\n🚀 Created a new index");
      console.info(response);
      console.info('\n');
    } else {
      console.info(error);
    }

  }
);
```



## 组件化

连接 apollo client 并请求 apollo server 提供的 api

依赖 apollo provider 组件，实现 query client
