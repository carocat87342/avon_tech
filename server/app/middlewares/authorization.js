const isReadOnly = (req, res, next) => {
  const readOnly = process.env.READ_ONLY === "true";
  if (readOnly) {
    return res.status(403).send({ message: "App is on read only mode. Your can not add, update or delete!" });
  }
    next();
};


const authorization = {
  isReadOnly
};

module.exports = authorization;
