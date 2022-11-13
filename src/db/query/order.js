export default {
    addOrder: `
        insert into orders (
            user_id,
            food_id,
            count,
            amount
        ) values ( $1, $2, $3, $4 )
        returning *
    `,
    editOrderView: `
        update orders set
            admin_view = true
        where orders_id::text = $1
        returning *
    `,
    getForAdmin: `
        select
            *
        from orders
        where admin_view = false
    `
}