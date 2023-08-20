import * as configFile from '../config.json';
interface Configuration {
  serverUrl: string;
}

function getServerBaseUrl(): string {
  if (process.env.USE_LOCAL_SERVER === 'true') {
    return configFile.appBackendBaseUrl.localServer;
  } else {
    return configFile.appBackendBaseUrl[process.env.NODE_ENV];
  }
}

let config: Configuration = {
  serverUrl: `${getServerBaseUrl()}/graphql`,
};

export const Configuration = config;
