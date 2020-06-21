import { Express, Request, Response, NextFunction } from 'express'
import { EntityManager } from 'typeorm'
import { AccountModel } from './models'
import { ErrorModel, CODES } from './error'
import { ROLES } from 'kioku/enum'

export class Middleware {
    constructor(server: Express, transaction: EntityManager) {
        server.use('/', this.locals(transaction))
        server.use('/order', this.userAuth(transaction))
        server.use('/admin', this.adminAuth(transaction))
    }

    private userAuth(transaction: EntityManager) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const account = new AccountModel()
            const token = req.headers?.authorization?.split(' ')[1]
            
            try {
                if(token) {
                    const user = await account.authentication(token, transaction)

                    if(user) {
                        next()
                    } else {
                        throw ErrorModel.new(CODES.CODE_401, `You're not authorized`)
                    }
                } else {
                    throw ErrorModel.new(CODES.CODE_401, `You're not authorized`)
                }
            } catch (err) {
                res.status(err.code).send(err)
            }
        }
    }

    private adminAuth(transaction: EntityManager) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const account = new AccountModel()
            const token = req.headers?.authorization?.split(' ')[1]
            
            try {
                if(token) {
                    const superadmin = await account.authentication(token, transaction).then(user => user ? user.role === ROLES.SUPERADMIN ? true : false : false)
                    const admin = await account.authentication(token, transaction).then(user => user ? user.role === ROLES.ADMIN ? true : false : false)

                    if(superadmin || admin) {
                        next()
                    } else {
                        throw ErrorModel.new(CODES.CODE_401, `You're not authorized`)
                    }
                } else {
                    throw ErrorModel.new(CODES.CODE_401, `You're not authorized`)
                }
            } catch (err) {
                res.status(err.code).send(err)
            } 
        }
    }

    private locals(transaction: EntityManager) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const account = new AccountModel()
            const token = req.headers?.authorization?.split(' ')[1]
            const user = await account.authentication(token, transaction)
            
            res.locals.user = user ? user : {}
            next()
        }
    }
}