import { Express, Request, Response } from 'express'
import { Connection } from 'typeorm'
import { System } from 'kioku/tools'

export abstract class AbstractController {
    private server: Express
    private connection: Connection
    
    constructor(__server: Express, __connection: Connection) {
        this.server = __server
        this.connection = __connection
        this.initialize()
    }

    protected async initialize() {
        const routes = this.routes()

        Object.keys(routes).map(route => {
            Object.keys(routes[route]).map(type => {
                this.server[type](route, async (req: Request, res: Response) => {
                    const queryRunner = this.connection.createQueryRunner()
                    await queryRunner.connect()
                    await queryRunner.startTransaction()

                    try {
                        await routes[route][type](req, res, queryRunner.manager)
                        await queryRunner.commitTransaction()
                    } catch(error) {
                        await queryRunner.rollbackTransaction()

                        if(error?.code){
                            res.status(error.code).json({error})
                            System.error(error.code, error)
                        } else {
                            res.status(500).json({error})
                            System.error(500, error)
                        }
                    } finally {
                        await queryRunner.release()
                    }
                })
            })
        })
    }

    protected routes() {
        return {}
    }
}