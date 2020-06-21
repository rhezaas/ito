import { EntityManager } from 'typeorm'
import { CategoryQuery } from '../queries'

export class CategoryModel {
    // Insert
    public async createCategory(name: string, transaction: EntityManager ) {
        const category = new CategoryQuery(transaction)

        await category.createCategory(name)

        return category.getAll()
    }

    public async createSubCategory(category_id: number, name: string, transaction: EntityManager) {
        const category = new CategoryQuery(transaction)

        await category.createSubCategory(category_id, name)

        return category.getAll()
    }

    public async addItems(datas: [{
        category_id: number,
        name: string,
        price: number,
        description: string
    }], transaction: EntityManager) {
        const category = new CategoryQuery(transaction)

        await category.addItems(datas)

        return category.getAll()
    }

    // Read
    public async get(transaction: EntityManager) {
        const category = new CategoryQuery(transaction)

        return await category.getAll()
    }
    
    // Update


}