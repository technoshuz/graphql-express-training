import 'reflect-metadata';
import express from 'express';
import {buildSchema} from 'type-graphql';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import graphqlPlaygroundExpress from "./utils/graphql-playground/graphql-playground";
import {createConnection} from "typeorm";
import ProductResolver from "./resolvers/product-resolver/product-resolver";
import UserResolver from "./resolvers/user-resolver/user-resolver";
import TransactionResolver from "./resolvers/transaction-resolver/transaction-resolver";

async function startServer() {
    const port = process.env.PORT || 3000;
    const graphqlEndpoint = '/graphql';

    const app = express();

    await createConnection({
        type: "mongodb",
        host: "127.0.0.1",
        port: 27017,
        database: "test",
        entities: ["dist/entities/*.*"]
    });
    const schema = await buildSchema({resolvers: [ProductResolver, UserResolver, TransactionResolver]});

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(
        graphqlEndpoint,
        bodyParser.json(),
        graphqlExpress((req, res) => ({
            schema: schema,
            context: {req, res}
        }))
    );
    app.use('/playground', graphqlPlaygroundExpress({endpoint: graphqlEndpoint}));

    app.listen(port, ()=> console.log(`Listening on port ${port}`));
}

startServer();