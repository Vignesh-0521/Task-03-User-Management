module.exports = (err, req, res, next) => {   //error handing method
    const status = err.status || 500;   //if any error status or 500
    const message = err.message || 'Server Error';
  
    res.status(status).json({
      error: true,
      message: typeof message === 'string' ? message : message.map(e => e.msg),
    });
  };
  