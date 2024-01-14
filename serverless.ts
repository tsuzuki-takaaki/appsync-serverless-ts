import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'appsync-serverless-ts',
  frameworkVersion: '3',
  plugins: ['serverless-better-credentials'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
  },
};

module.exports = serverlessConfiguration;
