var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const fileUpload = require('express-fileupload');
var cron = require('node-cron');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const PushHiController = require("./controllers/PushHiController");
const HiController = require("./controllers/HiController")
var app = express();



app.use(cors())
app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/v1/covid/", require("./routes/covid"))
app.use("/api/v1/forms/", require("./routes/forms"))
app.use("/api/v1/budgets/", require("./routes/budgets"))
app.use("/api/v1/audit/", require("./routes/audit.js"))
app.use("/api/v1/auth/", require("./routes/auth.js"))
app.use("/api/v1/import/", require("./routes/import.js"))
app.use("/api/v1/make/", require("./routes/makeHi"))
app.use("/api/v1/report/", require("./routes/report"))

// cron.schedule('0 0 */1 * * *', () => {
//     PushHiController.PushHi    
//     console.log("import")
// });
// cron.schedule('*/1 * * * *', () => {
//     PushHiController.PushHi()
// });
// cron.schedule('*/30 * * * *', () => {
//     PushHiController.PushHi()
// });
  
  
module.exports = app;
