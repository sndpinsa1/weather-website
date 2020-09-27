const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./util/geocode');
const forecast = require('./util/forecast');
const app = express();
const port = process.env.PORT || 3000 ;



// Define path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewDirPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup static folder
app.use(express.static(publicDirPath))

// Setup handlebar view config
app.set('view engine','hbs');
app.set('views', viewDirPath);
hbs.registerPartials(partialsPath);
app.get('', (req, res)=>{
    res.render('index', {
        title:"Weather App",
        name:"Sandeep Saini"
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name:"Sandeep Saini",
        title:'About Me'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"Help Page",
        message:"We are happy to help you",
        name:"Sandeep Saini"
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        pagedetail:"Help Article Not Found"
    })
})



app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error:"Please provide a address"
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    console.log(req.query);
res.send({ products:[]});
})

app.get('*', (req, res)=>{
    res.render('404', {
        pagedetail:"My 404 Page"
    })
})


app.listen(port, ()=>{
    console.log("Server is up on port : "+port);
});