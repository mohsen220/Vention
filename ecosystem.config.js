module.exports = {
  apps: [
    {
      name: "my-app",
      script: "npm",
      args: "run dev",
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
      out_file: "/home/ec2-user/project/Vention/logs/my-app-out.log",
      error_file: "/home/ec2-user/project/Vention/logs/my-app-error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
  