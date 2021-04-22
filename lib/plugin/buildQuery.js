"use strict";

exports.__esModule = true;
exports.default = buildQuery;

var _core = require("@superset-ui/core");

function buildQuery(formData) {
  // Set the single QueryObject's groupby field with series in formData
  return (0, _core.buildQueryContext)(formData, baseQueryObject => {
    return [{ ...baseQueryObject
    }];
  });
}