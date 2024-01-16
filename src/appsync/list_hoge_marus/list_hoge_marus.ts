import { Context, DynamoDBScanRequest } from "@aws-appsync/utils";
import type { Query } from "appsync";

export function request(ctx: Context): DynamoDBScanRequest {
  return {
    "operation" : "Scan",
  };
}

export function response(ctx: Context<object, object, object, object, Query['listHogeMarusJs']>) {
  // TODO: Check interface -> if you want to return array, return ctx.result.items
  return ctx.result;
}

// For example, if you're resolving the author field of the following query:
// query {
//   getPost(id: 1234) {
//       postId
//       title
//       content
//       author {
//           id
//           name
//       }
//   }
// }
// Then the full context variable that is available when processing a response mapping template might be:
// {
//   "arguments" : {
//     id: "1234"
//   },
//   "source": {},
//   "result" : {
//       "postId": "1234",
//       "title": "Some title",
//       "content": "Some content",
//       "author": {
//         "id": "5678",
//         "name": "Author Name"
//       }
//   },
//   "identity" : {
//       "sourceIp" : ["x.x.x.x"],
//       "userArn" : "arn:aws:iam::123456789012:user/appsync",
//       "accountId" : "666666666666",
//       "user" : "AIDAAAAAAAAAAAAAAAAAA"
//   }
// }
