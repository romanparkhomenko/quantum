const createError = require('http-errors');
const express = require('express');
const path = require('path');

const sessionRouter = require('./api/sessions');
const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/sessions', sessionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
    // res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Express server listening on ${port}`);