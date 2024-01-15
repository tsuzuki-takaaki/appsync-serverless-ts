import { AppSyncClient, EvaluateCodeCommand, EvaluateCodeCommandInput } from "@aws-sdk/client-appsync";
import { readFile } from 'fs/promises';
import { fromSSO } from "@aws-sdk/credential-providers";

const client = new AppSyncClient({
  credentials: fromSSO({ profile: 'apierce' }),
  region: "ap-northeast-1"
});
const file = './resolvers/list_hoge_marus.js'

describe('list hoge marus', () => {
  test('request', async () => {
    const context = {}
    const input: EvaluateCodeCommandInput = {
      runtime: { name: 'APPSYNC_JS', runtimeVersion: '1.0.0' },
      code: await readFile(file, { encoding: 'utf8' }),
      context: JSON.stringify(context),
      function: 'request',
    };

    const evaluateCodeCommand = new EvaluateCodeCommand(input);
    const response = await client.send(evaluateCodeCommand);

    console.log(response.evaluationResult);
    // TODO: Add asertion
    // {"operation":"Scan"}
  })
  test('response', async () => {
    const context = await readFile('./src/list_hoge_marus/list_hoge_marus.json', { encoding: 'utf8' })
    const input: EvaluateCodeCommandInput = {
      runtime: { name: 'APPSYNC_JS', runtimeVersion: '1.0.0' },
      code: await readFile(file, { encoding: 'utf8' }),
      context: context,
      function: 'response',
    };

    const evaluateCodeCommand = new EvaluateCodeCommand(input);
    const response = await client.send(evaluateCodeCommand);

    console.log(response.evaluationResult);
    // TODO: Add asertion
    // {"id":1,"name":"black_grey"}
  })
})
