import { Express, Request, Response, NextFunction } from 'express'
import { EntityManager } from 'typeorm'
import { AccountModel } from './models'
import { ErrorModel, CODES } from './error'
// import { System } from 'kioku/tools'

export class Middleware {
    constructor(server: Express, transaction: EntityManager) {
        server.use('/admin', this.adminAuth(transaction))
    }

    private adminAuth(transaction: EntityManager) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const account = new AccountModel()
            const token = req.headers.authorization.split(' ')[1]
            const is_authorize = await account.authentication(token, transaction)

            try {
                if(is_authorize) {
                    next()
                } else {
                    throw ErrorModel.new(CODES.CODE_401, `You're not authorized`)
                }
            } catch (err) {
                res.status(err.code).send(err)
            }
            
        }
    }
}