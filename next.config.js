module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tipancarte.s3.eu-west-3.amazonaws.com'],
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
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
  }
}