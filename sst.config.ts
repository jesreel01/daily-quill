/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "daily-quill",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "prac-dev",
          region: "ap-southeast-1",
        },
        "aws-native": {
          version: "1.46.0",
          region: "ap-southeast-1",
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("Client", {
      path: "apps/client",

      buildCommand:
        'npx --yes @opennextjs/aws@latest build --build-command "npm run build:open-next"',
    });

    // const databaseUrl = new sst.Secret("DatabaseUrl");

    const api = new sst.aws.ApiGatewayV2("Api", {
      domain: "api.dailyquill.orisondigital.net",
    });

    api.route("ANY /{proxy+}", {
      handler: "apps/api/dist/lambda.handler",
      timeout: "30 seconds",
      copyFiles: [{ from: "apps/api/package.json", to: "package.json" }],
      nodejs: {
        format: "cjs",
        install: [
          "@nestjs/microservices",
          "@nestjs/websockets",
          "class-transformer",
          "class-validator",
          "bcrypt",
          "pg",
        ],
      },
      // link: [databaseUrl],
      environment: {
        DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/daily_quill",
      },
    });
  },
});
