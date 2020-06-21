import { EntityManager } from 'typeorm'
import { AccountQuery } from '../queries'
import * as bcrypt from 'bcrypt'
import { ROLES } from 'kioku/enum'

export class AccountModel {
    public async initialize(transaction: EntityManager) {
        await this.superAccountSetup(transaction)
    }

    // Insert
    public async accountSetup(name: string, role: ROLES, password: string, transaction: EntityManager) {
        const accountQuery = new AccountQuery(transaction)
        const encryptedPassword = await bcrypt.hash(password, 10)
        const token = await bcrypt.hash(encryptedPassword, 10)
        
        return await accountQuery.createAccount(name, role, encryptedPassword, token)   
    }

    // Read
    public async login(role: ROLES, password: string, transaction: EntityManager) {
        const user = new AccountQuery(transaction)
        const accounts = await user.getUsersByRole(role)

        return await Promise.all(accounts.map(async account => {
            const is_match = await bcrypt.compare(password, account.password)

            if(is_match){
                await user.updateCred(account.id, await bcrypt.hash(account.password, 10))

                return {
                    id: account.id,
                    name: account.name,
                    role: account.role,
                    token: await user.getUserById(account.id).then(acc => acc.token)
                }
            } else {
                return false
            }
        })).then(users => users[0])
    }

    public async authentication(token: string, transaction: EntityManager) {
        const user = new AccountQuery(transaction)
        const account = await user.getCred(token)

        return account ? true : false
    }

    // Update
    private async superAccountSetup(transaction: EntityManager) {
        const account = new AccountQuery(transaction)
        
        await account.getSuperAdmin()
        .catch(async err => {
            if(err.code === 500) {
                const encryptedPassword = await bcrypt.hash(process.env.SUPERADMIN_KEY, 10)
                const token = await bcrypt.hash(encryptedPassword, 10)

                await account.createAccount('dev', ROLES.SUPERADMIN, encryptedPassword, token)
            }
        })
    }
}