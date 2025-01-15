const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = 'my-s3-bucket';
exports.handler = async (event) => {
    const { fileName, fileContent, fileType } = JSON.parse(event.body);
    if (!fileName || !fileContent || !fileType) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "fileName, fileContent, and fileType are required." }),
        };
    }
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(fileContent, 'base64'),
        ContentType: fileType,
    };
    try {
        const data = await s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "File uploaded successfully!", data }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to upload file", error: err.message }),
        };
    }
};
