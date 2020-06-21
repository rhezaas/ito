import {
    UserEntity,
} from 'kioku/entities'
import { UserInterface } from 'kioku/interfaces'
import { AbstractQuery } from '../abstracts'
import { ROLES } from 'kioku/enum'

export class AccountQuery extends AbstractQuery {
    // Create
    public async createAccount(name: string, role: ROLES, password?: string, token?: string) {
        return this.insert(UserEntity, q => {
            return q.values({
                name,
                role,
                password,
                token,
            })
        })
    }

    // Read
    public async getSuperAdmin(): Promise<UserInterface> {
        return this.query(UserEntity, 'user')
            .where('user.role = :role', {role: ROLES.SUPERADMIN})
            .getOne()
    }

    public async getUsersByRole(role: ROLES): Promise<UserInterface[]> {
        return this.query(UserEntity, 'user')
            .where('user.role = :role', {role})
            .getMany()
    }

    public async getUserById(id: number): Promise<UserInterface> {
        return this.query(UserEntity, 'user')
            .where('user.id = :id', {id})
            .getOne()
    }

    public async getCred(token: string): Promise<string> {
        return this.query(UserEntity, 'user')
            .where('user.token = :token', {token})
            .getOne()
            .then((res: UserInterface) => {
                return res?.token
            })
    }

    // Update
    public async updateCred(id: number, token: string) {
        return this.update(UserEntity, update => {
            return update.set({token})
                .where('id = :id', {id})
        })
    }
}