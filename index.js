// Import the Storage class from the '@google-cloud/storage' package
const { Storage } = require('@google-cloud/storage');

// Import the 'dotenv' package to load environment variables from a .env file
require('dotenv').config();

// Get the 'PROJECT_ID' and 'KEYFILENAME' environment variables from the .env file
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;

// Create a new Storage object with the specified project ID and key file
const storage = new Storage({ projectId, keyFilename });

// Define an asynchronous function to upload a file to Google Cloud Storage
async function uploadFile(bucketName, file, fileOutputName) {
    try {
        // Get a reference to the specified bucket
        const bucket = storage.bucket(bucketName);

        // Upload the specified file to the bucket with the given destination name
        const ret = await bucket.upload(file, {
            destination: fileOutputName
        });

        // Return the result of the upload operation
        return ret;
    } catch (error) {
        // Handle any errors that occur during the upload process
        console.error('Error:', error);
    }
}

// Use an immediately-invoked function expression (IIFE) to call the uploadFile function
(async () => {
    // Call the uploadFile function with the specified parameters
    const ret = await uploadFile(process.env.BUCKET_NAME, 'test.txt', 'CodingWithAdo.txt');

    // Log the result of the upload operation to the console
    console.log(ret);
})();
