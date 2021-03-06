var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
var loansRouter = require('./routes/loans');
var ratesRouter = require('./routes/rates');
var wagesRouter = require('./routes/wages');
var tax_reliefRouter = require('./routes/tax_relief')
var filing = require('./routes/contributions')

const options = {
definition:{
  openapi:"3.0.3",
  info: {
    title:"iPayroll API",
    version:"1.0.0",
    description:"An express API for managing payrolls"
  },
  servers: [
    {
      url: "https://amalitechipayroll.herokuapp.com"
    }
  ],
},
apis:[`./routes/*.js`],
};

const specs = swaggerJsDoc(options);

var app = express();


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);
app.use('/loans', loansRouter);
app.use('/rates', ratesRouter);
app.use('/wages', wagesRouter);
app.use('/tax_relief', tax_reliefRouter);
app.use('/filing',filing)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
