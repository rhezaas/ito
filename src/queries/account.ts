import { UserEntity, UserAccountEntity } from 'kioku/entities'
import { UserInterface, UserAccountInterface } from 'kioku/interfaces'
import { QueryModel } from '../abstracts'

export class AccountQuery extends QueryModel {

    // Create
    public async createAccount(user_id: number, password: string, token: string) {
        return this.insert(UserAccountEntity, q => {
            return q.values({
                user_id,
                password,
                token
            })
        })
    }

    // Read
    public async getAccount(name: string): Promise<UserInterface & {account: UserAccountInterface}> {
        return this.select(UserEntity, 'user')
            .leftJoinAndMapOne('user.account', UserAccountEntity, 'account', 'account.user_id = user.id')
            .where('user.name = :name', {name})
            .getOne() as any
    }

    public async getCred(token: string): Promise<UserAccountInterface> {
        return this.select(UserAccountEntity, 'account')
            .where('account.token = :token', {token})
            .getOne() as any
    }

    // Update 
    public async updateCred(user_id: number, token: string) {
        return this.update(UserAccountEntity, q => {
            return q.set({token})
                .where('user_id = :user_id', {user_id})
        })
    }
}