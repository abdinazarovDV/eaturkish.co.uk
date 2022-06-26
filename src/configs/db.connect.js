import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
	user: "postgres",
	password: "1",
	database: "ea_turkish",
	host: "localhost"
})