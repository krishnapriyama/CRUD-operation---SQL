const express = require('express');
const db = require('./Model/database');
const cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// setup sqlite
// process.on('SIGINT', () => {
//   db.close((err) => {
//     if (err) {
//       console.error('Error closing database:', err.message);
//     } else {
//       console.log('Database connection closed.');
//     }
//     process.exit(0);
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
  res.json({ error: err.message });
});

module.exports = app;
