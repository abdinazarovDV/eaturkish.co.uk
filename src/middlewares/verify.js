import authQuery from "#query/auth.js";
import jwt from "#util/jwt.js";

export default {
    isAuth: async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) throw new Error("No token");
            const { userId, agent } = jwt.verify(token);
        
            if (!(req.headers['user-agent'] == agent)) throw new Error("token is invalid!")

            const user = await req.fetch(authQuery.findUserById, userId)
            if(!user) throw new Error("Invalid token")

            req.user_id = userId
            return next()
        } catch (err) {
            return next(err);
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) throw new Error("No token");
            const { adminId, agent } = jwt.verify(token);

            if (!(req.headers['user-agent'] == agent)) throw new Error("token is invalid!")

            const admin = await req.fetch(authQuery.findAdminById, adminId)
            if(!admin) throw new Error("Invalid token")

            return next()
        } catch (err) {
            return next(err);
        }
    }
}