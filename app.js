//Require Libraries
const express = require('express')
const Tenor = require("tenorjs").client({
    "Key": "62UIM85XT7ZS", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});
// App Setup

const app = express()
app.use(express.static("public"))

//Middleware
const exphbs  = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


//Routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    Tenor.Search.Query(term, "10")
        .then(response => {
            // store the gifs we get back from the search
            const gifs = response;
            // pass the gifs as an object into the home page
            res.render('home', { gifs })
        }).catch(console.error);
})

app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name
    // render the greetings view, passing along the name
    res.render('greetings', { name })
  })

//Start Server

app.listen(3000, () => { 
    console.log("Gif Search listening on port localhost:3000!")
})