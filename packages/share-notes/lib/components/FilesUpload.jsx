import React, { useCallback, useEffect, useState } from 'react';
import {
  getSetting,
  registerComponent,
  useRegisteredMutation,
  withCurrentUser,
  useCreate2,
  getCollection,
} from 'meteor/vulcan:core';
import Dropzone from 'react-dropzone-uploader';
import { get } from 'lodash';
import UploadedFiles from '../modules/uploadedFiles/collection';

const awsSettings = getSetting('aws');

const FilesUpload = ({currentUser, documentId, collectionName}) => {
  const [s3Policy, setS3Policy] = useState({});
  const S3_BUCKET_URL = awsSettings.awsS3BucketUrl;

  const getPolicyAndSignature = useRegisteredMutation({
    name: 'policyAndSignatureMutation',
  });

  useEffect(() => {
    const getPolicyAndSignatureData = async () => {
      const result = await getPolicyAndSignature();
      setS3Policy(get(result, 'data.policyAndSignatureMutation', {}));
    };
    getPolicyAndSignatureData().then(() => {
    });
  }, []);

  const [addUploadedFile, {data, loading}] = useCreate2(
    ({collection: UploadedFiles, collectionName: 'UploadedFiles'}));

  const getUploadParams = ({file, meta}) => {
    const fields = {
      'key': `${currentUser._id}/\${filename}`,
      'acl': 'private',
      'policy': s3Policy.base64Policy,
      'x-amz-credential': s3Policy.xAmzCredential,
      'x-amz-algorithm': 'AWS4-HMAC-SHA256',
      'x-amz-date': s3Policy.xAmzDate,
      'x-amz-signature': s3Policy.s3Signature,
    };
    const headers = {
      'Access-Control-Allow-Origin': '*',
    };
    return {url: S3_BUCKET_URL, method: 'POST', fields: fields, headers: headers, meta: {}};
  };

  const createUploadedFile = (meta) => {
    const {name, size, type, duration, videoHeight, videoWidth} = meta;
    addUploadedFile({
      data: {
        userId: currentUser._id,
        documentId,
        collectionName,
        name: name,
        size: size,
        type: type,
        duration: duration,
        videoHeight: videoHeight,
        videoWidth: videoWidth,
      },
    });
  };

  const handleChangeStatus = ({meta}, status) => {
    if (status === 'done') {
      createUploadedFile(meta);
    }
  };

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept={`.pdf,.tex,.zip` /*${awsSettings.allowedType}/**/} 
        maxFiles={awsSettings.maxFiles}
        maxSizeBytes={awsSettings.maxSizeBytes}
        inputContent={(files, extra) => (extra.reject
          ? 'Only .pdf, .tex or .zip files are accepted'
          : 'Drag & drop your files here!')}
        styles={{
          dropzone: { minHeight: '100px',
          backgroundColor: 'lightgrey',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'darkslategrey',
          cursor: 'pointer' },
          input: { display: 'None' },
          inputLabel: {
            display: 'flex',
            float: 'left',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'inherit'
          }
        }}/>
    </div>
  );
};

registerComponent({name: 'FilesUpload', component: FilesUpload, hocs: [withCurrentUser]});

/*
styles={{
          dropzoneReject: {borderColor: 'red', backgroundColor: '#DAA'},
          inputLabel: (files, extra) => (extra.reject ? {color: 'red'} : {}),
        }}
*/