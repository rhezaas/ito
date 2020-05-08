import { ControllerModel } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { AccountModel } from '../models'

export class AccountController extends ControllerModel {
    public routes() {
        return {
            '/account/login': {
                post: this.login
            },
        }
    }

    public async login(req: Request, res: Response, transaction: EntityManager) {
        const user = new AccountModel()
        await user.login(req.body.name, req.body.password, transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
    }
}