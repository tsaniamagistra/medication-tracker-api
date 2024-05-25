const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const storage = new Storage();
const bucketName = 'med-tracker-bucket';
const bucket = storage.bucket(bucketName);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // batasi ukuran file max 5MB
  },
});

const uploadImage = (file, userId) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return resolve(null);
    }

    const blob = bucket.file(`${userId}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${userId}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { multer, uploadImage };