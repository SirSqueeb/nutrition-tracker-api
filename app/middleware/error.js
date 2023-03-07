import * as uuid from 'uuid';

class Err extends Error {
  constructor ({
    code = 500,
    context = '',
    message = '',
  }) {
    super(message);

    // Map the error properties onto this object
    this.uuid = uuid.v4();
    this.code = code;
    this.context = context;

    // Capture stack trace and remove all frames above constructorOpt from results
    Error.captureStackTrace(this, this.constructor);
  }
}

const errHandler = (err, req, res, next, context = 'No context provided') => {
  if (err instanceof Err) return next(err);
  return next(new Err({
    message: err,
    code: 500,
    context,
  }));
};

export { Err, errHandler };