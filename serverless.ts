// import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration = { // TODO: Type -> const serverlessConfiguration: AWS にappSyncを入れれるようにする https://github.com/sid88in/serverless-appsync-plugin/blob/dbaf899e0fc2c1543cbd980074f67f043b3b604f/src/types/serverless.d.ts ?
  service: 'appsync-serverless-ts',
  frameworkVersion: '3',
  plugins: ['serverless-better-credentials', 'serverless-appsync-plugin', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region: 'ap-northeast-1',
  },
  functions: { hello },
  package: { individually: true },
  appSync: {
    name: 'hogeMaru',
    schema: 'schema.graphql',
    authentication: {
      type: 'API_KEY'
    },
    dataSources: {
      hogeMaruSource: { // this is for mappingTemplates' dataSource
        type: 'AMAZON_DYNAMODB',
        config: {
          tableName: 'HogeMaru'
        }
      }
    },
    resolvers: {
      'Query.listHogeMarus': {
        kind: 'UNIT',
        dataSource: 'hogeMaruSource',
        request: './mapping-templates/list_hoge_marus/request.vtl',
        response: './mapping-templates/list_hoge_marus/response.vtl'
      },
      'Query.listHogeMarusJs': {
        functions: [
          { dataSource: 'hogeMaruSource', code: './resolvers/list_hoge_marus.js' }
        ]
      },
      'Mutation.putHogeMaru': {
        kind: 'UNIT',
        dataSource: 'hogeMaruSource',
        request: './mapping-templates/put_hoge_maru/request.vtl',
        response: './mapping-templates/put_hoge_maru/response.vtl'
      }
    }
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
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
