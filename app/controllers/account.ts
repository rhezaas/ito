import { AbstractController } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { AccountModel } from '../models'

export class AccountController extends AbstractController {
    public routes() {
        return {
            '/account/login': {
                post: this.login
            },
        }
    }

    public async login(req: Request, res: Response, transaction: EntityManager) {
        const user = new AccountModel()
        
        const {
            role,
            password
        } = req.body

        if(password) {
            await user.login(role, password, transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
        } else {
            res.status(500).json('Password is Required')
        }
    }
}