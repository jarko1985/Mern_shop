function errorHandler(err, req, res, next) {
  //Authentication Error
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized User!!" });
  }
  //Validation Error
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: err });
  }

  //Default to 500 Server Error

  return res.status(500).json(err);
}

module.exports = errorHandler;
