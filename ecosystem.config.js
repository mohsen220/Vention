module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./app.js", // Path to your app's main file
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
