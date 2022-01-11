import React, { memo, useRef, useState } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };
  const onChange = async (event) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]); // 실행될 때까지 기다렸다가 완료되면 uploaded에 값이 할당
    setLoading(false); // await이 끝나고 결과 json이 uploaded 변수에 저장되면 loading state가 false로 바뀜
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*" // image file, 모든 형식
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || 'No file'}
        </button>
      )}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
