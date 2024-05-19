const mongoose = require('mongoose');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();
const name = 'projects/926900016822/secrets/mongodb-connection-string/versions/latest';

async function getSecret() {
  try {
    const [version] = await client.accessSecretVersion({ name: name });
    return version.payload.data.toString('utf8');
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
}

const connectDB = async () => {
  try {
    const connectionString = await getSecret();
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectDB;
