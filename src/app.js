const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.port || 3000;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar view engine and viewpath
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sarbajit Paul'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sarbajit Paul'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sarbajit Paul',
        message: 'If you need help, then you\'re fucked, \'cause there ain\'t any help'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({
                error
            });
        
        forecast(latitude, longitude, (error, {temperature, feelTemperature, description, message} = {}) => {
            if(error)
                return res.send({
                    error
                });

            res.send({
                // temperature: temperature + ' °C',
                forecast: message,
                location,
                address: req.query.address,
            });
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Sarbajit Paul',
        errorMessage: 'Help article not found'
    });
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Sarbajit Paul',
        errorMessage: 'Page not found'
    });
})
app.listen(port, () => {
    console.log('The server is up and running at port ' + port);
});