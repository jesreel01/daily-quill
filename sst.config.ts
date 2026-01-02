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
  },
});
