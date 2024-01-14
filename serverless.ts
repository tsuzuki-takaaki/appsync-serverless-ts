import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'appsync-serverless-ts',
  frameworkVersion: '3',
  plugins: ['serverless-better-credentials'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
  },
  resources: { // TODO
    Resources: {
      Table: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'HogeMaru',
          AttributeDefinitions: [ { AttributeName: 'id', AttributeType: 'S' } ],
          KeySchema: [ { AttributeName: 'id', KeyType: 'HASH' } ],
          ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        },
      }
    }
  }
};

module.exports = serverlessConfiguration;
