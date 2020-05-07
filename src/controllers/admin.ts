import { ControllerModel } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { CategoryModel } from 'models'
export class AdminController extends ControllerModel {
    public routes() {
        return {
            '/admin/category': {
                post: this.create
            },
        }
    }

    public async create(req: Request, res: Response, transaction: EntityManager) {
        const category = new CategoryModel()

        await category.createCategory(req.body.name, transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
    }
}