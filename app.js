const express = require('express'), 
app = express(),
port = 3000,
appRouter = require('./router'),
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/', appRouter)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))