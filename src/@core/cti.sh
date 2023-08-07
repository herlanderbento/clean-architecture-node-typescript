#!/bin/sh

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -b && 
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' -i 'migrator-cli.ts' -b && 

npm run cti create './src/user/application' -- -i '*spec.ts' -b && 
npm run cti create './src/user/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/user/infra' -- -i '*spec.ts' -b

npm run cti create './src/job/application' -- -i '*spec.ts' -b && 
npm run cti create './src/job/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/job/infra' -- -i '*spec.ts' -b

# npm run cti create './src/user-favorite/application' -- -i '*spec.ts' -b && 
# npm run cti create './src/user-favorite/domain' -- -i '*spec.ts' -b && 
# npm run cti create './src/user-favorite/infra' -- -i '*spec.ts' -b

# npm run cti create './src/category/application' -- -i '*spec.ts' -b && 
# npm run cti create './src/category/domain' -- -i '*spec.ts' -b && 
# npm run cti create './src/category/infra' -- -i '*spec.ts' -b

# npm run cti create './src/ingredient/application' -- -i '*spec.ts' -b && 
# npm run cti create './src/ingredient/domain' -- -i '*spec.ts' -b && 
# npm run cti create './src/ingredient/infra' -- -i '*spec.ts' -b

# npm run cti create './src/comment/application' -- -i '*spec.ts' -b && 
# npm run cti create './src/comment/domain' -- -i '*spec.ts' -b && 
# npm run cti create './src/comment/infra' -- -i '*spec.ts' -b