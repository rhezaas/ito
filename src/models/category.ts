import { EntityManager } from 'typeorm'
import { CategoryQuery } from 'queries'

export class CategoryModel {
    public async tester(transaction: EntityManager) {
        
    }

    // Insert
    public async createCategory(name: string, transaction: EntityManager ) {
        const category = new CategoryQuery(transaction)

        return await category.createCategory(name)
            .then(async () => {
                return await category.getAll()
            })
    }

    // Read
    public async get(transaction: EntityManager) {
        const category = new CategoryQuery(transaction)

        return await category.getAll()
    }

    // Update


}