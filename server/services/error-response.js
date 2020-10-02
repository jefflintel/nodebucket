/* ============================================
 ; Title:  error-response.js
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   30 September 2020
 ; Description: error response template
 ===========================================*/

class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      'message': this.message,
      'httpCode': this.httpCode,
      'data': this.httpCode,
      'timeStamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = ErrorResponse;
