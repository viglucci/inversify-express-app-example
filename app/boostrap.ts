import 'reflect-metadata';
import * as express from "express";
import * as swagger from "swagger-express-ts";
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { InversifyExpressServer } from 'inversify-express-utils';
import { buildProviderModule } from "inversify-binding-decorators";
import { Container } from 'inversify';

import './controllers/_index';

let container = new Container();

container.load(buildProviderModule());

let server = new InversifyExpressServer(container);

server.setConfig((app) => {

    const swaggerUiPath = path.resolve(`${__dirname}/../static/swagger`);
    const swaggerUiAssetsPath = path.resolve(`${__dirname}/../node_modules/swagger-ui-dist`);

    app.use('/api-docs/swagger', express.static(swaggerUiPath));
    app.use('/api-docs/swagger/assets', express.static(swaggerUiAssetsPath));
    app.use(swagger.express(
        {
            definition: {
                info: {
                    title: process.env.npm_package_name,
                    version: process.env.npm_package_version
                },
                // Models can be defined here
            }
        }
    ));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
});

server.setErrorConfig((app: any) => {
    app.use((
        error: Error,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction) => {
        console.error(error.stack);
        response.status(500).send("Something broke!");
    });
});

let serverInstance = server.build();

export default serverInstance;
