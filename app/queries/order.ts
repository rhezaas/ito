import { AbstractQuery } from '../abstracts'
import { OrderEntity, OrderItemEntity, ItemEntity } from 'kioku/entities'
import { ORDER_STATUS } from 'kioku/enum'
import { OrderInterface, ItemInterface } from 'kioku/interfaces'

export class OrderQuery extends AbstractQuery {
    // Insert
    public async create(user_id: number) {
        return this.insert(OrderEntity, insert => {
            return insert.values({user_id})
        })
    }

    public async addItems(order_id: number, item_ids: number[]) {
        return this.insert(OrderItemEntity, insert => {
            return insert.values(item_ids.map(item_id => {
                return  {
                    order_id,
                    item_id,
                }
            }))
        })
    }

    // Read
    public async get(user_id: number, status: ORDER_STATUS): Promise<OrderInterface> {
        return this.query(OrderEntity, 'order')
            .where('order.user_id = :user_id', {user_id})
            .andWhere('order.status = :status', {status})
            .getOne()
    }

    public async getDetail(order_id: number): Promise<OrderInterface & {
        items: ItemInterface[]
    }> {
        return this.query(OrderEntity, 'order')
            .leftJoin('order.orderItems', 'orderItem')
            .leftJoinAndMapMany('order.items', ItemEntity, 'item', 'item.id = orderItem.item_id')
            .where('order.id = :order_id', {order_id})
            .getOne() as any
    }

    // Update
    public async updatePrice(order_id: number, total: number) {
        return this.update(OrderEntity, update => {
            return update.set({total})
                .where('id = :order_id', {order_id})
        })
    }

    // Delete
}