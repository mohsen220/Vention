module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./node_modules/.bin/webpack",
      args: "serve",
      watch: true,
      env: {
        NODE_ENV: "development",
        PATH:
          process.env.PATH +
          ":/home/ec2-user/project/Vention/node_modules/.bin",
      },
      env_production: {
        NODE_ENV: "production",
        PATH:
          process.env.PATH +
          ":/home/ec2-user/project/Vention/node_modules/.bin",
      },
    },
  ],
};
