import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/')
export default class HomeController {

    @httpGet('/')
    public get(
        request: Request,
        response: Response): void {
        return response.redirect('/api-docs/swagger');
    }
}
