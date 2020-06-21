import { AbstractQuery } from '../abstracts'
import { CategoryEntity, ItemEntity } from 'kioku/entities'
import { CategoryInterface, ItemInterface } from 'kioku/interfaces'

export class CategoryQuery extends AbstractQuery {
    // Create
    async createCategory(name: string) {
        return this.insert(CategoryEntity, insert => {
            return insert.values({name})
        })
    }

    async createSubCategory(category_id: number, name: string) {
        return this.insert(CategoryEntity, insert => {
            return insert.values({category_id, name})
        })
    }

    async addItems(datas: [{
        category_id: number,
        name: string,
        price: number,
        description: string
    }]) {
        return this.insert(ItemEntity, insert => {
            return insert.values(datas)
        })
    }

    // Read
    async getAll(): Promise<Array<CategoryInterface & {items: ItemInterface[]}>> {
        return this.query(CategoryEntity, 'category')
            .leftJoinAndMapMany('category.items', ItemEntity, 'item', 'item.category_id = category.id')
            .getMany()
        
    }

    async getSubCategories(): Promise<CategoryInterface[]> {
        return this.query(CategoryEntity, 'category')
            .where('category.category_id IS NOT NULL')
            .getMany()
    }

    async getItems(category_id: number): Promise<CategoryInterface & {items: ItemInterface[]}> {
        return this.query(CategoryEntity, 'category')
            .leftJoinAndMapMany('category.items', ItemEntity, 'item', 'item.category_id = category.id')
            .where('category.id = :category_id', {category_id})
            .getOne()
        
    }

    // Update
    // Delate
}