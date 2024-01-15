// src/list_hoge_marus/list_hoge_marus.ts
function request(ctx) {
  return {
    "operation": "Scan"
  };
}
function response(ctx) {
  return ctx.result;
}
export {
  request,
  response
};
