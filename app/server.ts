import * as express from 'express'
import * as bodyParser from  "body-parser"
import { Database } from 'kioku/database'
import { Middleware } from './middleware'
import * as Models from './models'
import * as Controllers from './controllers'
import { System } from 'kioku/tools'

export class Server {
    private server = express()
    private database = new Database()

    constructor() {
        this.database.synchronize()
        .then(connection => {
            this.server.use(bodyParser.json())

            new Middleware(this.server, connection.manager)

            Object.values(Controllers).map(controller => {
                new controller(this.server, connection)
            })

            this.server.use('/', (req, res) => {
                res.type('html').send(`
                    <html>
                        <head>
                            <title style="font-family:arial">❤UwU❤️</title>
                        </head>
                        <body>
                            <p style="font-family:arial">I'm fine baby UwU</p>
                        </body>
                    </html>
                `)
            })
    
            this.server.listen(8080, () => {
                System.specializeLog('SERVER', 120, '================================')
                System.specializeLog('SERVER', 120, '======= ITO LIVE AT 8080 =======')
                System.specializeLog('SERVER', 120, '================================')
            })

            return connection

        }).then(connection => {
            if(process.env.INITIALIZE) {
                new Models.AccountModel().initialize(connection.manager)
            }
        })
        .catch(err => {
            System.warn(err)
        })
    }
}