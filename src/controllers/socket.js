
export default class SocketIO {
    static msg

    constructor (message) {
        SocketIO.msg = message || SocketIO.msg
    }

    newOrder (data) {
        if(SocketIO.msg) {
            SocketIO.msg.emit('new order', { orders: data })
        }
    }
}

