


export default function socketController (io, msg) {
    msg.emit('new order', { name: "na" })
}

