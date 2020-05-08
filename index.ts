import { config } from 'dotenv'
import { Server } from './server'

config()
new Server().initialize()