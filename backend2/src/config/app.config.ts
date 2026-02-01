export const appConfig = {
  API_PREFIX: "/api",

  PASSWORD_HASH_SALT_ROUNDS: 10,

  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  FILE_UPLOAD: {
    MAX_SIZE_MB: 10,
    TEMP_DIR: "/tmp",
  },

  CART: {
    EXPIRY_HOURS: 24,
  },
};
