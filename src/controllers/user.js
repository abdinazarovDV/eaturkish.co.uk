import userQuery from '#query/user.js'


export default {
    editUser: async (req, res, next) => {
        try {
            const {
                first_name,
                last_name,
                user_password,
                user_phone
            } = req.body

            const user_id = req.user_id || '9d68cfaf-d056-462e-af01-5cd52ecd6f4c'


            const result = await req.fetch(userQuery.editUser, user_id, first_name, last_name, "", user_password, user_phone, "")
            if(!result) throw new Error('User not edit')

            return res.json({
                status: 200,
                data: [ result ],
                message: "User successfully edited"
            })
        } catch (err) {
            return next(err)
        }
    }
}