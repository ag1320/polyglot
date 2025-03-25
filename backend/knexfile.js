import 'dotenv/config';

const config = {
  development: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
    debug: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
    debug: false,
  },
};

export default config;
