import { AbstractController } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { CategoryModel } from '../models'

export class CategoryController extends AbstractController {
    public routes() {
        return {
            '/category': {
                get: this.get
            },
        }
    }

    private async get(req: Request, res: Response, transaction: EntityManager) {
        const category = new CategoryModel()

        await category.get(transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
    }
}