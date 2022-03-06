module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    FIB_APIKEY: process.env.FIB_APIKEY,
    FIB_AUTH_DOMAIN: process.env.FIB_AUTH_DOMAIN,
    FIB_DATABASE_URL: process.env.FIB_DATABASE_URL,
    FIB_PROJECT_ID: process.env.FIB_PROJECT_ID,
    FIB_STORAGE_BUCKET: process.env.FIB_STORAGE_BUCKET,
    FIB_MESSAGING_SENDER_ID: process.env.FIB_MESSAGING_SENDER_ID,
    FIB_APP_ID: process.env.FIB_APP_ID,
  }
}