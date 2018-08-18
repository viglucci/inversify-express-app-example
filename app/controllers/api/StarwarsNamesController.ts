import {
    controller,
    httpGet,
    queryParam
} from 'inversify-express-utils';
import { ApiPath } from "swagger-express-ts";
import * as names from 'starwars-names';
import { ApiOperationGet, SwaggerDefinitionConstant } from 'swagger-express-ts';
import * as matchSorter from 'match-sorter';

@ApiPath({
    path: "/api/starwars-names",
    name: "Starwars Names API"
})
@controller('/api/starwars-names')
export default class StarWarsNamesController {

    @ApiOperationGet({
        path: '/',
        description: 'Retrieve a list of starwars names.',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
        }
    })
    @httpGet('/')
    public getAll(): any {
        return names.all;
    }

    @ApiOperationGet({
        path: '/random',
        description: 'Retrieve an random list of names.',
        parameters: {
            query: {
                "count": {
                    description: "Howmany names to retrieve.",
                    required: false,
                    allowEmptyValue: false,
                    type: "number"
                }
            }
        },
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
        }
    })
    @httpGet('/random')
    public getRandom(
        @queryParam("count") count: number
    ): any {
        if (!count) { count = 1; }
        return names.random(count);
    }

    @ApiOperationGet({
        path: '/search',
        description: 'Retrieve an search list of names.',
        parameters: {
            query: {
                "term": {
                    description: "The search term.",
                    required: true,
                    allowEmptyValue: false,
                    type: "string"
                }
            }
        },
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
        }
    })
    @httpGet('/search')
    public getSearch(
        @queryParam("term") term: string
    ): any {
        return matchSorter(names.all, term);
    }
}
