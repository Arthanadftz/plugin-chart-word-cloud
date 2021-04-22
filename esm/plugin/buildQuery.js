import { buildQueryContext } from '@superset-ui/core';
export default function buildQuery(formData) {
  // Set the single QueryObject's groupby field with series in formData
  return buildQueryContext(formData, baseQueryObject => {
    return [{ ...baseQueryObject
    }];
  });
}