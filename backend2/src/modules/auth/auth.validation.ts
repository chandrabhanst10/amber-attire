export const registerSchema = {
  required: ["name", "email", "phone", "password"],
};

export const loginSchema = {
  required: ["email", "password"],
};
