const { body, check, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [
        check("email").exists().withMessage("Email can not empty!"),
        check("email").isEmail().withMessage("Must be valid Email address!"),
        check("password", "Password can not empty!").exists().not().isEmpty(),
      ];
    }
    case "createUser": {
      return [
        check("client.name", "Practice name can not empty!")
          .exists()
          .not()
          .isEmpty(),
        /*         check("client.address", "Practice address can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.city", "Practice city can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.state", "Practice state can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.postal", "Practice postal can not empty!")
          .exists()
          .not()
          .isEmpty(), */
        check("client.phone", "Practice phone can not empty!")
          .exists()
          .not()
          .isEmpty(),
        /*       check("client.fax", "Practice fax can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.email", "Practice email can not empty!")
          .exists()
          .not()
          .isEmpty(), */
        check("client.website", "Practice website can not empty!")
          .exists()
          .not()
          .isEmpty(),
        /*         check("client.ein", "Practice ein can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.npi", "Practice npi can not empty!")
          .exists()
          .not()
          .isEmpty(),
        check("client.code", "Client code can not empty!")
          .exists()
          .not()
          .isEmpty(), */
        check("user.email", "User email can not empty!").exists().isEmail(),
        check("user.password", "User password can not empty!")
          .exists()
          .not()
          .isEmpty(),
      ];
    }
    case "sendConfirmationEmail": {
      return [
        body("email")
          .exists()
          .withMessage("Email address must be provided!")
          .isEmail()
          .withMessage("Must be a valid email address"),
      ];
    }
    case "resendConfirmationEmail": {
      return [
        body("email")
          .exists()
          .withMessage("Email address must be provided!")
          .isEmail()
          .withMessage("Must be a valid email address"),
      ];
    }
    case "verifyConfirmationEmail": {
      return [
        param("token", "token can not be empty").exists(),
        param("userId", "UserId can not be empty").exists(),
      ];
    }
    case "resetPassword": {
      return [
        param("email", "token can not be empty")
          .exists()
          .withMessage("Email address must be provided!")
          .isEmail()
          .withMessage("Must be a valid email address"),
      ];
    }
    case "resetPasswordNew": {
      return [
        param("token", "token can not be empty").exists(),
        param("userId", "UserId can not be empty").exists(),
        body("password").exists().withMessage("Password must be provided!"),
      ];
    }
    case "createAppointmentType": {
      return [
        check("data.appointment_type")
          .exists()
          .withMessage("Appointment Type can not empty!"),
        check("data.length").exists().withMessage("Minutes an not empty!"),
        check("data.allow_patients_schedule")
          .exists()
          .withMessage("Allow Patient Schedule can not empty!"),
        check("data.sort_order")
          .exists()
          .withMessage("Sort order can not empty!"),
      ];
    }
    default:
      return false;
  }
};
