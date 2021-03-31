const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : "";
    data.creator = !isEmpty(data.creator) ? data.creator : "Kache";
    if (Validator.isEmpty(data.title)) {
        errors.name = "title field is required";
    }
    if (Validator.isEmpty(data.creator)) {
        errors.name = "creator field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};