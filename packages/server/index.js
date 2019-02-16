const app = require('./app')
const { PORT } = require('./constants/constants')

app.listen(PORT, () => {
    console.log(`connected to server on port ${PORT}`)
})