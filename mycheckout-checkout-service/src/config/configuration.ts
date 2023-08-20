export default () => {
  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY must be defined.');
  }
  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error('AWS_ACCESS_KEY_ID must be defined.');
  }
  if (!process.env.PAYMENTEZ_API_KEY) {
    throw new Error('PAYMENTEZ_API_KEY must be defined');
  }
  if (!process.env.PAYMENTEZ_API_TOKEN) {
    throw new Error('PAYMENTEZ_API_TOKEN must be defined');
  }
  if (!process.env.INFOBIP_APP_KEY) {
    throw new Error('INFOBIP_APP_KEY must be defined');
  }
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN must be defined');
  }
  if (!process.env.TWILIO_AUTH_TOKEN) {
    throw new Error('TWILIO_AUTH_TOKEN must be defined');
  }
  if (!process.env.JWT_TOKEN) {
    throw new Error('JWT_TOKEN must be defined');
  }
  if (!process.env.MAILER_VTEX_APP_KEY) {
    throw new Error('MAILER_VTEX_APP_KEY must be defined');
  }
  if (!process.env.MAILER_VTEX_APP_TOKEN) {
    throw new Error('MAILER_VTEX_APP_TOKEN must be defined');
  }
  if (!process.env.AWS_STYLES_BUCKET) {
    throw new Error('AWS_STYLES_BUCKET must be defined');
  }
  if (!process.env.AWS_STYLES_CF_DISTRIBUTION_ID) {
    throw new Error('AWS_STYLES_CF_DISTRIBUTION_ID must be defined');
  }
  return {
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    PAYMENTEZ_API_KEY: process.env.PAYMENTEZ_API_KEY,
    PAYMENTEZ_API_TOKEN: process.env.PAYMENTEZ_API_TOKEN,
    INFOBIP_APP_KEY: process.env.INFOBIP_APP_KEY,
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    JWT_TOKEN: process.env.JWT_TOKEN,
    MAILER_VTEX_APP_KEY: process.env.MAILER_VTEX_APP_KEY,
    MAILER_VTEX_APP_TOKEN: process.env.MAILER_VTEX_APP_TOKEN,
    AWS_STYLES_BUCKET: process.env.AWS_STYLES_BUCKET,
    AWS_STYLES_CF_DISTRIBUTION_ID: process.env.AWS_STYLES_CF_DISTRIBUTION_ID
  };
};
