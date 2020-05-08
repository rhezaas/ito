import { QueryModel } from '../abstracts'
import { CategoryEntity, ItemEntity } from 'kioku/entities'
import { CategoryInterface, ItemInterface } from 'kioku/interfaces'

export class CategoryQuery extends QueryModel {
    // Create
    async createCategory(name: string) {
        this.insert(CategoryEntity, q => {
            return q.values({name})
        })
    }

    // Read
    async getAll(): Promise<Array<CategoryInterface & {items: ItemInterface[]}>> {
        return this.select(CategoryEntity, 'category')
        .leftJoinAndMapMany('category.items', ItemEntity, 'item', 'item.category_id = category.id')
            .getMany() as any
    }

    async getItems(category_id: number): Promise<CategoryInterface & {items: ItemInterface[]}> {
        return this.select(CategoryEntity, 'category')
            .leftJoinAndMapMany('category.items', ItemEntity, 'item', 'item.category_id = category.id')
            .where('category.id = :category_id', {category_id})
            .getOne() as any
    }

    // Update
    // Delate
}