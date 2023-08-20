# Chaordic GraphQL resolvers

To add your Chaordic token you must create a file in VBase at the `secret_keys` bucket called `keys.json` with this format:

```
{
  "apiKey": "<apiKey>",
  "secretKey": "<token>"
}
```

Example curl:

```
curl --request PUT \
  --url 'http://vbase.aws-us-east-1.vtex.io/<account>/<workspace>/buckets/vtex.chaordic-graphql/secret_keys/files/keys.json' \
  --header 'authorization: <vtex token>' \
  --header 'content-type: application/json' \
  --data '{
  "apiKey": "<apiKey>",
  "secretKey": "<token>"
}'
```

To grab your vtex token, run on the terminal:

`vtex local token`
