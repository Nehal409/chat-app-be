import { badData } from "@hapi/boom";

const validate = (payload, schema) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    const message = error.details.map((err) => err.message).join(", ");
    throw badData(message);
  }
  return value;
};

export default validate;
