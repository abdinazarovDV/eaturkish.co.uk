import jwt from 'jsonwebtoken';
import config from '#config/general.config.js'


let sign = (payload) => jwt.sign(payload, config.SECRET_KEY);
let verify = (token) => jwt.verify(token, config.SECRET_KEY);

export default {
    sign,
    verify
}