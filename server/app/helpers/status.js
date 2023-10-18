const successMessage = { status: "success" };
const errorMessage = { status: "error" };
const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  inValid: 422,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};

const trip_statuses = {
  active: 1.0,
  cancelled: 2.0,
};

module.exports = { successMessage, errorMessage, status, trip_statuses };
