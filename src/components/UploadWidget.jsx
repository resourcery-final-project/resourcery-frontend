import React, { Component, useState } from 'react';

export default function UploadWidget() {
  const [url, setUrl] = useState('');
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'dbxyv0tbd',
      uploadPreset: 'bpb1muxg',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        setUrl(result.info.url);
      }
    }
  );

  console.log('this is the url woot!', url);

  return (
    <>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={() => myWidget.open()}
      >
        Upload
      </button>

      <img src={url} />
    </>
  );
}
