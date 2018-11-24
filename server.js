const express = require('express')
const hbs =  require('hbs')
const fs = require('fs')

const app = express()
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//     if(req){
//     res.render('mantain.hbs')
//     }
// })

app.use(express.static(__dirname + '/public'))



app.use((req, res, next) => {
const log = `${new Date().toString()}: ${req.method} ${req.url}`
console.log(log)

// fs.appendFile('server.log', log + '\n', (err) => {
//     if(err) {
//         console.log(err)
//     }
// })
 next()
})



hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getFullYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', text => text.toUpperCase())

app.get('/api', (req, res) => {
    res.send({
        name: 'A json file',
        age: 19,
        location: 'Abbottabad'
    })
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        heading: 'home page',
        welcome: 'Welcome to our Home page',    
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        heading: 'About page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Bad data requested'
    })
})

app.listen(port , () => {
    console.log('Server is up')
})