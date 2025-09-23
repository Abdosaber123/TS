import { config } from "dotenv"
config()
export const devConfig = {
    DB_URL : process.env.DB_URL,
    EMAIL_USER:process.env.EMAIL_USER,
    DB_PORT :process.env.DB_PORT,
    JWP_SECRET:process.env.JWP_SECRET as string
}