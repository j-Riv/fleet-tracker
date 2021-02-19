import dotenv from 'dotenv';
dotenv.config();
let server = 'https://fleet.suavecito.com';

const env = process.env.NODE_ENV;

if (env === 'development') {
  server = 'http://localhost:3000';
}

export default server;
