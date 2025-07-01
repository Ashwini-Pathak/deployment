export const mapKeyToCustomObj = (custom_schema = {}, payload = {}) => {
  const mappedObj = Object.create({});

  for (const key of Object.keys(custom_schema)) {
    const k = custom_schema[key];
    mappedObj[k] = payload[key];
  }

  return mappedObj;
};

export const mapValueToCustomObj = (fields = {}, payload = {}) => {
  const mappedObj = Object.create({});

  for (const key of Object.keys(fields)) {
    const v = fields[key];
    mappedObj[key] = v;
  }

  return { ...payload, ...mappedObj };
};
