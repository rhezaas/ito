import { EntityManager } from 'typeorm'
// import { AccountQuery } from '../queries'
// import * as bcrypt from 'bcrypt'

export class OrderModel {
    // Insert
    public async accountSetup(name: string, password: string, transaction: EntityManager) {
        // const user = new AccountQuery(transaction)
        // const encryptedPassword = await bcrypt.hash(password, 10)
        // const token = await bcrypt.hash(encryptedPassword, 10)
        // const account = await user.getAccount(name)
        
        // return await user.createAccount(account.id, encryptedPassword, token)   
    }

    // Read
    public async login(name: string, password: string, transaction: EntityManager) {
        // const user = new AccountQuery(transaction)
        // const account = await user.getAccount(name)
        // const is_match = await bcrypt.compare(password, account.account.password)

        // if(is_match) {
        //     await user.updateCred(account.id, await bcrypt.hash(account.account.password, 10))

        //     return {
        //         id: account.id,
        //         name: account.name,
        //         role: account.role,
        //         token: await user.getAccount(name).then(acc => acc.account.token)
        //     }
        // }
    }

    public async authentication(token: string, transaction: EntityManager) {
        // const user = new AccountQuery(transaction)
        // const account = await user.getCred(token)

        // return account ? true : false
    }

    // Update


}