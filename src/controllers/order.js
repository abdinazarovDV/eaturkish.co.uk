import orderQuery from '#query/order.js'
import foodQuery from '#query/food.js'
import userQuery from '#query/user.js'
import socketController from '#controller/socket.js'


export default {
    addOrder: async (req, res, next) => {
        try {
            const user_id =  req.user_id ||'9d68cfaf-d056-462e-af01-5cd52ecd6f4c'
            
            const user = await req.fetch(userQuery.findUser, user_id)
            if(!user) throw new Error('User not found')
            delete user.user_password

            let { orders } = req.body || []
            
            if(orders.length == 0) throw new Error('No orders')

            let result = []

            //checking order 
            for(let order of orders) {
                if(!order.food_id) throw new Error('No food id')
                if(!order.count) throw new Error('No food count')

                const food = await req.fetch(foodQuery.findFood, order.food_id)
                if(!food) throw new Error('Invalid food id')

                const orderCreated = await req.fetch(orderQuery.addOrder, user_id, food.food_id, order.count, +order.count * +food.food_price)
                if(!orderCreated) throw new Error('Order not added')

                orderCreated.food_name = food.food_name
                orderCreated.food_price = food.food_price
                orderCreated.food_picture = food.food_picture

                result.push(orderCreated)
            }

            const child = new socketController()
            
            child.newOrder({
                user: user,
                orders: result
            })

            return res.json({
                    status: 200,
                    data: [],
                    message: "Orders successfully added"
                })


        } catch (err) {
            return next(err)
        }
    },
    adminViewed: async (req, res, next) => {
        try {

            const { orders } = req.body
            if(orders.length == 0) throw new Error('Orders must have array')
            
            for(let order of orders) {
                const orderEdited = await req.fetch(orderQuery.editOrderView, order)
                if(!orderEdited) throw new Error('Admin didn\'t see')
            }

            return res.json({
                status: 200,
                data: [],
                message: "Admin view order"
            })

        } catch (err) {
            return next(err)
        }
    },
    getOrderToAdmin: async (req, res, next) => {
        try {
            const orders = await req.fetchAll(orderQuery.getForAdmin)

            return res.json({
                status: 200,
                data: orders
            })
        } catch (err) {
            return next(err)
        }
    }
} 