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
    const aws = await import("@pulumi/aws");
    const awsnative = await import("@pulumi/aws-native");

    $transform(aws.lambda.FunctionUrl, (args, opts, name) => {
      new awsnative.lambda.Permission(`${name}InvokePermission`, {
        action: "lambda:InvokeFunction",
        functionName: args.functionName,
        principal: "*",
        invokedViaFunctionUrl: true,
      });
    });

    new sst.aws.Nextjs("Client", {
      path: "apps/client",

      buildCommand:
        'npx --yes @opennextjs/aws@latest build --build-command "npm run build:open-next"',
    });

    new sst.aws.Function("Api", {
      handler: "apps/api/dist/lambda.handler",
      url: true,
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
      environment: {
        DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/postgres",
        PORT: "8000",
      },
    });
  },
});
