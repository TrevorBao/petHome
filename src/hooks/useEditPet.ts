import { useRef, useState } from 'react';
import { db, storage } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useToast } from '@chakra-ui/react';
import { PetProps } from './usePets';

interface Props {
  pet: PetProps;
  onClose: () => void;
}

const useEditPet = ({ pet, onClose }: Props) => {
  const [formData, setFormData] = useState(pet);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function updatePet(petId: string, data) {
    const petRef = doc(db, 'petInfo', petId);
    await updateDoc(petRef, data);
  }
  
  
  async function deletePet(petId: string) {
    const petRef = doc(db, 'petInfo', petId);
    await deleteDoc(petRef);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNumber = (valueAsNumber: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      weight: valueAsNumber,
    }));
  };
  
  
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files as FileList);

    if (formData.imageUrls) {
      if (files.length + formData.imageUrls.length <= 12) {
        setLoading(true);
        try {
          const newImageUrls = await Promise.all(files.map(async (file: File) => {
      
            const storageRef = ref(storage, `pets/${pet.id}/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
          }));
    
          handleImageAdd(newImageUrls);
        } catch (err) {
          toast({
            title: 'Image Upload Failed',
            description: `${(err as Error).message}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        } finally {
          setLoading(false);
        }
      } else {
        toast({
          title: 'Image Upload Refused',
          description: "You cannot upload more than 12 images. ",
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  
  };
  

  const handleImageRemove = (index: number) => {
    if (formData.imageUrls) {
      const updatedImages = formData.imageUrls.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        imageUrls: updatedImages,
      });
    }
  };

  const handleImageAdd = (newImageUrls: string[]) => {
    if (formData.imageUrls) {
      const updatedImages = formData.imageUrls.concat(newImageUrls).slice(0, 12);
      setFormData({ ...formData, imageUrls: updatedImages });
    }
  };


  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updatePet(formData.id, formData);
      onClose();
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: `${(err as Error).message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false);
      toast({
        title: 'Update Successful',
        description: 'Successfully update the pet information',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePet(formData.id);
      onClose();
    } catch (err) {
      toast({
        title: 'Delete Failed',
        description: `${(err as Error).message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false);
      toast({
        title: 'Delete Successful',
        description: 'Successfully delete the pet from the rehoming list',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleImageRemove,
    handleImageAdd,
    handleSubmit,
    handleDelete,
    isLoading,
    fileInputRef,
    handleNumber
  };
};

export default useEditPet;
