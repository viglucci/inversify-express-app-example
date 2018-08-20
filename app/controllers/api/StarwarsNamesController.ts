import {
    controller,
    httpGet,
    queryParam
} from 'inversify-express-utils';
import { ApiPath } from "swagger-express-ts";
import { ApiOperationGet, SwaggerDefinitionConstant } from 'swagger-express-ts';
import StarwarsNamesService from '../../starwars-names/StarwarsNamesService';

@ApiPath({
    path: "/api/starwars-names",
    name: "Starwars Names API"
})
@controller('/api/starwars-names')
export default class StarWarsNamesController {

    private starwarsNamesService: StarwarsNamesService;

    constructor(
        starwarsNamesService: StarwarsNamesService
    ) {
        this.starwarsNamesService = starwarsNamesService;
    }

    @ApiOperationGet({
        path: '/',
        description: 'Retrieve a list of names.',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY
            }
        }
    })
    @httpGet('/')
    public getAll(): any {
        return this.starwarsNamesService.getNames();
    }

    @ApiOperationGet({
        path: '/random',
        description: 'Retrieve a list of random names.',
        parameters: {
            query: {
                count: {
                    description: "How many names to retrieve.",
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
        return this.starwarsNamesService.getRandomNames(count);
    }

    @ApiOperationGet({
        path: '/search',
        description: 'Retrieve a list of names filtered by a search term.',
        parameters: {
            query: {
                term: {
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
        return this.starwarsNamesService.searchNames(term);
    }
}
