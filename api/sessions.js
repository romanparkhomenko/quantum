var express = require('express');
const url = require('url');
const querystring = require('querystring');
var router = express.Router();

/* GET sessions listing. */
router.get('/', function(req, res, next) {

    // Parse query params from request.
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    // Base SQL string
    let string = "SELECT * FROM sessions WHERE";

    let queryParams = Object.entries(query);

    console.log("queryParams.length = " + queryParams.length);
    console.log (queryParams);

    // Loop through form results and generate URL with params.
    for (let i = 0; i < queryParams.length; i++) {
        if (queryParams[i][0].includes("predicateField")) {
            string += " " + queryParams[i][1] + " ";
        }
        else if (queryParams[i][0].includes("operatorField")) {
            string += getOperatorType(queryParams[i][1]);
        }
        else if (queryParams[i][0].includes("inputFieldOne")) {
            if (i + 1 < queryParams.length) {
                string += " " + queryParams[i][1] + " AND";
            } else {
                string += " " + queryParams[i][1] + " ";
            }
        }
        else if (queryParams[i][0].includes("inputFieldTwo")) {
            if (i + 1 < queryParams.length) {
                string += " " + queryParams[i][1] + " AND";
            } else {
                string += " " + queryParams[i][1] + " ";
            }
        } else {
            string += " " + queryParams[i][1] + " ";
        }
    }

    console.log(string);
    res.json(string);

});

const getOperatorType = (operator) => {
    if (operator === "equals") {return "="}
    if (operator === "contains") {return "CONTAINS"}
    if (operator === "starts_with") {return "LIKE"}
    if (operator === "in_list") {return "IN"}
    if (operator === "between") {return "BETWEEN"}
    if (operator === "greater_than") {return ">"}
    if (operator === "less_than") {return "<"}
};

module.exports = router;
