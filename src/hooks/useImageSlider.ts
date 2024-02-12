import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const useImageSlider = (images: string[] | undefined) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasMultipleImages = images && images.length > 1;

  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
     }
    };

  const openPreview = (image: string) => {
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(`
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              img {
                max-width: 80%;
                max-height: 80vh;
                object-fit: contain;
              }
            </style>
            <img src="${image}" />
          `);
      }
    };

  return {
    currentImageIndex,
    hasMultipleImages,
    isOpen,
    onOpen,
    onClose,
    nextImage,
    prevImage,
    setCurrentImageIndex,
    openPreview,
  };
};

export default useImageSlider;