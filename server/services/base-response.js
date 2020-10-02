/* ============================================
 ; Title:  base-response.js
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   30 September 2020
 ; Description: response template
 ===========================================*/

class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      'message': this.message,
      'httpCode': this.httpCode,
      'data': this.data,
      'timeStamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
