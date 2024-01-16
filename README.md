# Commands
- Build(See `package.json`)
```sh
% npm run build
```

- Test(You need to login with SSO before running test)
```sh
% npm run test
```

- Generate Type from `schema.grapphql`
```sh
% npm run type-generate
```

- When you deploy to AWS(with SSO)
```sh
% serverless deploy --verbose --aws-profile your_profile_name
```

- When you remove stack(with SSO)
```sh
% serverless remove --verbose --aws-profile your_profile_name
```

