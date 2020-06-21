import { AbstractController } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'

export class OrderController extends AbstractController {
    public routes() {
        return {
            '/order': {},
        }
    }

    public async order(req: Request, res: Response, transaction: EntityManager) {

    }
}