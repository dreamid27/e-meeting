
require('dotenv').config()
const express = require('express'), 
app = express(),
port = process.env.PORT || 3333,
appRouter = require('./router'),
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
    
});

app.use('/', appRouter)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))