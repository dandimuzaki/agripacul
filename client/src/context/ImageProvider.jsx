import { useState } from 'react';
import { ImageContext } from './ImageContext.jsx';
import { uploadImage } from '@/services/imageService.js';
import dotenv from 'dotenv';

dotenv.config()

export const ImageProvider = ({ children }) => {
  const [preview, setPreview] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleChangeImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUploadImage = async () => {
    if (selectedImage) {
    const formData = new FormData()
    formData.append("image", selectedImage)
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)
    try {
      const data = await uploadImage(formData);
      const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
      return optimizedUrl
    } catch (err) {
      console.error("Image upload failed", err);
    }
  }
  };

  return (
    <ImageContext.Provider value={{
      preview, setPreview,
      selectedImage, setSelectedImage,
      handleChangeImage, handleUploadImage
    }}>
      {children}
    </ImageContext.Provider>
  );
};