/* ============================================
 ; Title:  employee.js
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   24 September 2020
 ; Description: employee model
 ===========================================*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

//employee schema (sprint 1)
let employeeSchema = new Schema({
  empId: { type: String, unique: true, dropDups: true },
  firstName: { type: String },
  lastName: { type: String },
  todo: [Item],
  done: [Item]
}, { collection: 'employees' });

module.exports = mongoose.model('Employee', employeeSchema);
