const express = require('express')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3000

app
	.use(favicon(__dirname + '/favicon.ico'))
	.use(bodyParser.json())
	.use(cors())

sequelize.initDb()

app.get('/', (req, res) => {
	res.json({ message: 'Hello, Heroku !'})
})

//const findAllPokemons = require('./src/routes/FindAllPokemons')
//findAllPokemons(app)
//en dessous syntaxe simplifiée 
require('./src/routes/FindAllPokemons')(app)
require('./src/routes/FindPokemonByPk')(app)
require('./src/routes/CreatePokemon')(app)
require('./src/routes/UpdatePokemon')(app)
require('./src/routes/DeletePokemon')(app)
require('./src/routes/Login')(app)
require('./src/routes/NewUser')(app)

app.use(({res}) => {
	const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
	res.status(404).json(message) 
})

app.listen(port, () => console.log(`Notre application Node est démarré sur : http://localhost:${port}`))