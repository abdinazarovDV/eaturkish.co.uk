import orderQuery from '#query/order.js'
import foodQuery from '#query/food.js'
import { required } from 'joi'

export default {
    addOrder: async (req, res, next) => {
        try {

            const user_id = '9d68cfaf-d056-462e-af01-5cd52ecd6f4c'

            const { orders } = req.body || []
            
            if(orders.length == 0) throw new Error('No orders')

            //checking order 
            for(let order of orders) {
                if(!order.food_id) throw new Error('No food id')
                if(!order.count) throw new Error('No food count')

                const food = await req.fetch(foodQuery.findFood, order.food_id)
                if(!food) throw new Error('Invalid food id')

                const order = await req.fetch(orderQuery.addOrder, user_id, food.food_id, order.count, +order.count * +food.food_price)

                if(order) throw new Error('Order not added')
            }

            return {
                status: 200,
                data: [],
                message: "Orders successfully added"
            }
        } catch (err) {
            return next(err)
        }
    }
}