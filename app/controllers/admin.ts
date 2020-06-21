import { AbstractController } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { CategoryModel, AccountModel } from '../models'
export class AdminController extends AbstractController {
    public routes() {
        return {
            '/admin/account': {
                post: this.createUser
            },
            '/admin/category': {
                post: this.createCategory
            },
        }
    }

    public async createUser(req: Request, res: Response, transaction: EntityManager) {
        const account = new AccountModel()

        const {
            name,
            role,
            password
        } = req.body

        await account.accountSetup(name, role, password, transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
    }

    public async createCategory(req: Request, res: Response, transaction: EntityManager) {
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