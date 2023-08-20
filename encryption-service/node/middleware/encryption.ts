export async function encryption(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { encryption}
  } = ctx

  try {
    const data = encryption.getEncryption(ctx.request.query.plaintext, ctx.request.query.key)    
    console.log('data: ', data);
    ctx.status = 201
    ctx.body = data
  } catch (error) {
    ctx.status = 502;
    console.log(JSON.stringify(error));
  }

  await next()
}
