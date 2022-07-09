/**
 * Class representing errorHandlers.
 * @extends Error
 */
 class ErrorHandler extends Error {
    /**
       * Create error handler.
       * @param {string} message - The message to be passed for the error.
       * @param {number} statusCode - The status code of the error.
       */
    constructor(message, statusCode = 400) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }

  module.exports =  ErrorHandler;
