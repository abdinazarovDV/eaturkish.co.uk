import { pool } from '#config/db.connect.js'

export default (req, res, next) => {
    try {
        req.fetch = async (SQL, ...params) => {
            const client = await pool.connect()
            try {
                const { rows: [row] } = await client.query(SQL, params.length ? params : null)
                return row
            }
            finally {
                client.release()
            }
        },
        req.fetchAll = async (SQL, ...params) => {
            const client = await pool.connect()
            try {
                const { rows } = await client.query(SQL, params.length ? params : null)
                return rows
            }
            finally {
                client.release()
            }
        }
        return next()
    } catch (err) {
        return next(err)
    }
}