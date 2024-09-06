/** @type {import('next').NextConfig} */

const getEnvConfig = () => {
  switch (process.env.ENV) {
    case "dev":
      return {
        env: "dev",
        apiUrl: "http://localhost:3001/api",
        websiteUrl: "http://localhost:3000",
      };
    case "stage":
      return {
        env: "stage",
        apiUrl: "https://smartTaskManager-stage-backend.com/api",
        websiteUrl: "https://smartTaskManager-stage.com/api",
      };
    case "prod":
      return {
        env: "prod",
        apiUrl: "https://smartTaskManager-backend.com/api",
        websiteUrl: "https://smartTaskManager.com/api",
      };
  }
};
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: getEnvConfig(),
};

module.exports = nextConfig;
