module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./node_modules/.bin/webpack",
      args: "serve",
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
