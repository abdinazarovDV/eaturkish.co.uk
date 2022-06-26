import { config } from 'dotenv';
config()

export default {
    PORT: process.env.PORT,
    PG_HOST: process.env.PG_HOST ,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_USER: process.env.PG_USER, 
    PG_DATABASE: process.env.PG_DATABASE,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
}