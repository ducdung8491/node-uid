const { newUID } = require('./uid')

const uid = newUID()

for (let i = 0; i < 10000; i++) {
    console.log(uid.id())
}