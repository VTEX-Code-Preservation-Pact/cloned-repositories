# Creating inline resolvers

If you need to [extend the FastStore API schema](https://www.faststore.dev/how-to-guides/faststore-api/extending-the-faststore-api) for your project or you wish to use an ecommerce platform that is not natively supported, you must create the corresponding inline resolvers.

This means you are going to write resolvers for the API schema in your project or use an external library.

To create your resolvers, follow the code example below.

```ts
import { getTypeDefs } from '@faststore/api'
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema'

// Get the Store API TypeDefs
const typeDefs = getTypeDefs()

const resolvers = {
  ...
  // add your resolvers
  ...
}

// Create a runnable schema
const schema = makeExecutableSchema({ resolvers, typeDefs })

// You now have a runnable GraphQL schema, you can create a server or run queries locally.
```
