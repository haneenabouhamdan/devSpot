// src/config.js
import dotenv from 'dotenv';

dotenv.config();

export const Config = {
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
};
