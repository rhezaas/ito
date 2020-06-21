import { ErrorModel, CODES } from '../error'

import {
    ObjectType,
    EntityManager,
    InsertQueryBuilder,
    UpdateQueryBuilder,
    DeleteQueryBuilder,
} from 'typeorm'

export abstract class AbstractQuery {
    private transaction: EntityManager = null

    constructor(__transaction: EntityManager) {
        this.transaction = __transaction
    }

    protected query<T>(table: ObjectType<T>, alias: string) {
        return this.transaction.createQueryBuilder(table, alias)
    }

    protected insert<T>(table: string | ObjectType<T>, fn: (query: InsertQueryBuilder<T>) => InsertQueryBuilder<T>, columns?: string[]) {
        return fn(
            this.transaction.createQueryBuilder()
            .insert()
            .into(table as any, columns)
        ).execute()
        .then(() => true)
        .catch(err => {
            throw ErrorModel.new(CODES.CODE_500, {
                schema: err.schema,
                main: err.table,
                message: err.message,
                detail: err.detail
            })
        })
    }

    protected update<T>(table: string | ObjectType<T>, fn: (query: UpdateQueryBuilder<T>) => UpdateQueryBuilder<T>) {
        return fn(this.transaction.createQueryBuilder()
            .update(table)
        ).execute()
        .then(() => true)
        .catch(err => {
            throw ErrorModel.new(CODES.CODE_500, {
                schema: err.schema,
                main: err.main,
                message: err.message,
                detail: err.detail
            })
        })
    }

    protected delete<T>(table: string | ObjectType<T>, fn: (query: DeleteQueryBuilder<T>) => DeleteQueryBuilder<T>) {
        return fn(this.transaction.createQueryBuilder()
            .delete()
            .from(table)
        ).execute()
        .then(() => true)
        .catch(err => {
            throw ErrorModel.new(CODES.CODE_500, {
                schema: err.schema,
                main: err.main,
                message: err.message,
                detail: err.detail
            })
        })
    }
}