import { enc, HmacSHA256 } from 'crypto-js';
import moment from 'moment';
import { getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('aws', null, 'AWS settings');
registerSetting('aws.awsAccessKey', null, 'AWS Access key');
registerSetting('aws.awsSecretKey', null, 'AWS Secret key');
registerSetting('aws.awsS3BucketName', null, 'AWS S3 Bucket name');
registerSetting('aws.expirationInMinutes', null, 'AWS S3 Expiration time');
registerSetting('aws.awsS3BucketUrl', null, 'AWS S3 Bucket Url', true);
registerSetting('aws.maxFiles', null, 'Maximum files allowed to upload', true);
registerSetting('aws.maxSizeBytes', null, 'Maximum size in bytes allowed to upload', true);
registerSetting('aws.allowedType', null, 'Allowed file types', true);

const awsSettings = getSetting('aws');

/**
 * @summary Returns a Policy and Signature to support Amazon S3 POST api
 * For more details see: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-UsingHTTPPOST.html
 */
export const getPolicyAndSignature = async (args, context) => {
  const targetFolder = context.currentUser._id;
  const accessKeyID = awsSettings.awsAccessKey;
  const secretAccessKey = awsSettings.awsSecretKey;
  const bucket = awsSettings.awsS3BucketName;
  const region = 'us-east-1';
  const folder = `${targetFolder}/`;
  const expiration = moment.utc().add(awsSettings.expirationInMinutes, 'minutes').toISOString();
  const date = moment.utc().format('YYYYMMDD');
  const serviceName = 's3';
  const xAmzCredential = `${accessKeyID}/${date}/${region}/${serviceName}/aws4_request`;
  const xAmzDate = date + 'T000000Z';
  const s3Policy = {
    'expiration': expiration,
    'conditions': [
      {'bucket': bucket},
      ['starts-with', '$key', folder],
      {'acl': 'private'},
      // ['starts-with', '$Content-Type', 'video/'],
      {'x-amz-credential': xAmzCredential},
      {'x-amz-algorithm': 'AWS4-HMAC-SHA256'},
      {'x-amz-date': xAmzDate},
    ],
  };

  function getSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = HmacSHA256(dateStamp, 'AWS4' + key);
    const kRegion = HmacSHA256(regionName, kDate);
    const kService = HmacSHA256(serviceName, kRegion);
    return HmacSHA256('aws4_request', kService);
  }

  const base64Policy = new Buffer(JSON.stringify(s3Policy), 'utf-8').toString('base64');
  const signatureKey = getSignatureKey(secretAccessKey, date, region, serviceName);
  const s3Signature = HmacSHA256(base64Policy, signatureKey).toString(enc.Hex);

  return {
    xAmzDate: xAmzDate,
    xAmzCredential: xAmzCredential,
    base64Policy: base64Policy,
    s3Signature: s3Signature,
  };
};
