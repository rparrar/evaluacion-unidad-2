require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`El servidor está funcionando ok en el puerto ${PORT}, puedes acceder directamente a http://localhost:${PORT}`)
})
