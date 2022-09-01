const { ValidationError, ForeignKeyConstraintError } = require('sequelize')

function logErrors(err, req, res, next) {
  // console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (!(err instanceof ForeignKeyConstraintError || err instanceof ValidationError)) {
    next(err)
    return
  }

  const { fields, parent } = err
  res.status(400).json({
    field: fields,
    message: parent.detail
  })
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
