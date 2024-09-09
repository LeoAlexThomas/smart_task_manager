/** @type {import('next').NextConfig} */

const getEnvConfig = () => {
  switch (process.env.ENV) {
    case "dev":
      return {
        env: "dev",
        apiUrl:
          "https://smart-task-manager-backend.netlify.app/.netlify/functions/api",
        websiteUrl: "http://localhost:3000",
      };
    case "stage":
      return {
        env: "stage",
        apiUrl:
          "https://smart-task-manager-backend.netlify.app/.netlify/functions/api",
        websiteUrl: "https://smartTaskManager-stage.com/api",
      };
    case "prod":
      return {
        env: "prod",
        apiUrl:
          "https://smart-task-manager-backend.netlify.app/.netlify/functions/api",
        websiteUrl: "https://smartTaskManager.com/api",
      };
  }
};
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: getEnvConfig(),
};

module.exports = nextConfig;
