// import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: any = { // TODO: Type -> const serverlessConfiguration: AWS にappSyncを入れれるようにする https://github.com/sid88in/serverless-appsync-plugin/blob/dbaf899e0fc2c1543cbd980074f67f043b3b604f/src/types/serverless.d.ts ?
  service: 'appsync-serverless-ts',
  frameworkVersion: '3',
  plugins: ['serverless-better-credentials', 'serverless-appsync-plugin'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
  },
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
        kind: 'UNIT',
        dataSource: 'hogeMaruSource',
        code: './resolvers/list_hoge_marus.js'
      },
      'Mutation.putHogeMaru': {
        kind: 'UNIT',
        dataSource: 'hogeMaruSource',
        request: './mapping-templates/put_hoge_maru/request.vtl',
        response: './mapping-templates/put_hoge_maru/response.vtl'
      }
    }
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
