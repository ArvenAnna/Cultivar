const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const path = require('path');

const morgan = require('morgan');

const tempLocation = process.env.TEMP_LOCATION;
const photoLocation = process.env.PHOTO_LOCATION;

let pathRewriteObj = {
    //'^/api' : '/'  - for now proxying with cutting api prefix not needed
}
pathRewriteObj[`^/${tempLocation}`] = '/' + tempLocation;
pathRewriteObj[`^/${photoLocation}`] = '/' + photoLocation;
// proxy middleware options
const options = {
    target: `http://app:${process.env.API_PORT}`, // target host
    changeOrigin: true,               // needed for virtual hosted sites
    // ws: true,                         // proxy websockets
    pathRewrite: pathRewriteObj,
    // router: {
    //     // when request.headers.host == 'dev.localhost:3000',
    //     // override target 'http://www.example.org' to 'http://localhost:8000'
    //     'dev.localhost:4003' : 'http://localhost:8000'
    // }
};

// create the proxy (without context)
const exampleProxy = proxy(options);

app.use(morgan('combined'));

app.use('/api', exampleProxy);
app.use('/' + tempLocation, exampleProxy);
app.use('/' + photoLocation, exampleProxy);


app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname + '/favicon.ico')));

app.use('/bin', express.static('bin'));

app.use('/translations', express.static('translations'));

app.use('/svg', express.static('svg'));
app.use('/css', express.static('css'));


app.set('port', process.env.NODE_PORT);

app.listen(app.get('port'), function() {
    console.log('Node App Started on port ' + process.env.NODE_PORT);
});
