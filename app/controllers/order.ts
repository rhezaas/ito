import { AbstractController } from '../abstracts'
import { Request, Response } from 'express'
import { EntityManager } from 'typeorm'
import { OrderModel } from '../models'
import { ErrorModel, CODES } from '../error'

export class OrderController extends AbstractController {
    public routes() {
        return {
            '/order/:id?': {
                get: this.getDetail,
                post: this.create
            },
        }
    }

    private async create(req: Request, res: Response, transaction: EntityManager) {
        const order = new OrderModel()
        const user_id = res.locals.user.id
        const order_id = parseInt(req.params.id, 10)
        const item_ids = Array.isArray(req.body.item_ids) ? req.body.item_ids : []

        if(!order_id) {
            await order.create(user_id, transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
        } else {
            if(item_ids.length > 0) {
                await order.addItems(order_id, item_ids, transaction)
                .then(r => {
                    res.status(200).json(r)
                })
                .catch(err => {
                    throw err
                })
            } else {
                throw ErrorModel.new(CODES.CODE_400, 'Required Item_ids!')
            }
        }
    }

    private async getDetail(req: Request, res: Response, transaction: EntityManager) {
        const order = new OrderModel()
        const order_id = parseInt(req.params.id, 10)

        if(order_id) {

            await order.getDetail(order_id, transaction)
            .then(r => {
                res.status(200).json(r)
            })
            .catch(err => {
                throw err
            })
        } else {
            throw ErrorModel.new(CODES.CODE_400, 'Required Order Id')
        }
    }
}