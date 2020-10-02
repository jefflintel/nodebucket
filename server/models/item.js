/* ============================================
 ; Title:  item.js
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   28 September 2020
 ; Description: item model
 ===========================================*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String }
});

module.exports = itemSchema;


