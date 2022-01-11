class ImageUploader {
  async upload(file) {
    //하나의 file 객체 받음
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'stvhoku6'); // upload preset 입력

    const result = await fetch(
      'https://api.cloudinary.com/v1_1/dnvzuljdl/image/upload', //버전 뒤에 내 cloud name 입력
      {
        method: 'POST',
        body: formData,
      }
    );
    return await result.json();
  }
}

export default ImageUploader;
