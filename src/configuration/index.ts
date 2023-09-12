export default () => ({
  port: process.env.PORT,
  db_host: process.env.POSTGRES_HOST,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  db_name: process.env.POSTGRES_DB,
  db_port: process.env.POSTGRES_PORT,
  jwt_token_secret: process.env.JWT_TOKEN_SECRET,
  jwt_token_expire: process.env.JWT_TOKEN_EXPIRE,
});
