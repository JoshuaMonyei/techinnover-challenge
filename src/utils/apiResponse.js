// Get error response
exports.errorResponse = (res, statusCode, msg, data = {}) => {
  res.status(statusCode).json({
    success: false,
    message: msg,
    data: data,
  });
};

// Get success response
exports.successResponse = (res, statusCode, msg, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message: msg,
    data: data,
  });
};
