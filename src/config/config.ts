import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './config.env') });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  DB_STRING: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  DB_STRING: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DB_STRING: process.env.DB_STRING,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const verifiedConfig = getSanitizedConfig(config);

export default verifiedConfig;
