import { EntityManager } from 'typeorm'
import { OrderQuery } from '../queries'
import { ORDER_STATUS } from 'kioku/enum'

export class OrderModel {

    // Insert
    public async create(user_id: number, transaction: EntityManager) {
        const order = new OrderQuery(transaction)

        return await order.create(user_id)
    }
    
    public async addItems(order_id: number, item_ids: number[], transaction: EntityManager) {
        const order = new OrderQuery(transaction)

        return await order.addItems(order_id, item_ids)
            .then(async () => {
                const detail = await order.getDetail(order_id)
                const total= detail.items.reduce((init, item) => init + item.price, 0)

                await order.updatePrice(order_id, total)

                return detail
            })
    }

    // Read
    public async get(user_id: number, status: ORDER_STATUS, transaction: EntityManager) {
        const order = new OrderQuery(transaction)

        return await order.get(user_id, status)
    }

    public async getDetail(order_id: number, transaction) {
        const order = new OrderQuery(transaction)

        return await order.getDetail(order_id)
    }
    // Update

}