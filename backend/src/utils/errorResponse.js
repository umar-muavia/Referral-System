export const sendErrorResponse = (res, { statusCode, message, errors = [], stack }) => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(stack ? { stack } : {}),
  });
};
