path=$(find src -type f -name '*.ts' | grep -v 'spec')

npx esbuild $path \
--outdir=resolvers \
--bundle \
--external:\"@aws-appsync/utils\" \
--format=esm \
--platform=node \
--target=esnext
