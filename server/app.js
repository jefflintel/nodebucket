/* ============================================
 ; Title:  app.js
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   24 September 2020
 ; Description: server business logic/APIs
 ===========================================*/


/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { response } = require('express');
const Employee = require('./models/employee');
const EmployeeApi = require('./routes/employee-api')

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
//const conn = 'mongodb+srv://superadmin:s3cret@cluster0-lujih.mongodb.net/nodebucket?retryWrites=true&w=majority';
const conn = 'mongodb+srv://nodebucket_user:sesame1@buwebdev-cluster-1.09j90.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */

 app.use('/api/employees', EmployeeApi)

 //suffix captures empId value from route http://localhost:3000/api/employees/1007
 //req.params.empId is the parameter passed from the route
/* app.get('/api/employees/:empId', async(req, res) => {
  try {
    //use mongoose employeemondel to query mongodb atlas by empId
    Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {
      //if there's a database level error, return a server 500 error
      if(err) {
        console.log(err);
        res.status(404).send({
          'message': 'Internal server error!'
        })
        //no errors, return employee object
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
    //catch anything unanticipated
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
 })*/

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
