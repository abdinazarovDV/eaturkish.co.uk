export default {
    addOrder: `
        insert into orders (
            user_id,
            food_id,
            count,
            amount
        ) values ( $1, $2, $3, $4 )
        returning *
    `
}