import { useRef, useState } from "react";
import { db, auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import image from "../assets/uploadImage.svg";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Select,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Image,
  Text,
  Flex,
  CloseButton,
  useToast,
  Skeleton,
} from "@chakra-ui/react";

const CreatePetInfo = () => {
  // Create new Pet Info
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petSex, setPetSex] = useState("");
  const [isSpayed, setIsSpayed] = useState("false");
  const [petHealth, setPetHealth] = useState("");
  const [allergy, setAllergy] = useState("");
  const [detail, setDetail] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // File Upload State
  const MAX_FILES = 12;
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // State for tracking image upload progress
  const [uploadingImages, setUploadingImages] = useState(false);
  const toast = useToast();

  const petCollectionRef = collection(db, "petInfo");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (uploadingImages) {
      toast({
        title: "Please wait until images are uploaded.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      await addDoc(petCollectionRef, {
        name: petName,
        breed: petBreed,
        type: petType,
        age: petAge,
        isSpayed: isSpayed,
        sex: petSex,
        weight: petWeight,
        health: petHealth,
        detail: detail,
        allergy: allergy,
        imageUrls: imageUrls,
        userId: auth?.currentUser?.uid,
      });

      uploadFiles();

      // Reset form and image states
      setPetName("");
      setPetType("");
      setPetBreed("");
      setPetAge("");
      setPetWeight("");
      setPetSex("");
      setIsSpayed("false");
      setPetHealth("");
      setAllergy("");
      setDetail("");
      setImagePreviews([]);
      setFileUpload(null);
      //   setImageUrls([]);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFiles = async () => {
    if (fileUpload) {
      setUploadingImages(true);
      const uploadPromises = [];
      const newImageUrls = [...imageUrls]; // Copy the current imageUrls

      for (let i = 0; i < fileUpload.length; i++) {
        const file = fileUpload.item(i);
        if (file) {
          const fileFolderRef = ref(storage, `users/${file.name}`);
          const uploadPromise = uploadBytes(fileFolderRef, file)
            .then((snapshot) => {
              return getDownloadURL(snapshot.ref); // Get the download URL
            })
            .then((downloadURL) => {
              newImageUrls.push(downloadURL); // Add the download URL to the array
            })
            .catch((err) => {
              console.error(err);
            });

          uploadPromises.push(uploadPromise);
        }
      }

      // Wait for all uploads to finish and then update the state
      await Promise.all(uploadPromises);
      setImageUrls(newImageUrls);
      setUploadingImages(false);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > MAX_FILES) {
      toast({
        title: `You can only upload up to ${MAX_FILES} images.`,
        status: "warning",
        isClosable: true,
      });
      return;
    }

    if (files) {
      const filesArray = Array.from(files);
      // Process each file
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Update the previews state
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
      // Update the fileUpload state
      setFileUpload(files);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Placeholder component
  const ImageUploadPlaceholder = () => {
    return (
      <Box
        maxW={"165px"}
        w={"full"}
        bg={"gray.100"}
        rounded={"md"}
        overflow={"hidden"}
        position="relative"
        h={"165px"}
        display="flex"
        flexDirection="column"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          pos={"relative"}
          h={"165px"}
        >
          <Image src={image} boxSize="40px" />
          <Text fontWeight={500} color="#AEB3B7">
            Images
          </Text>
          <Input
            type="file"
            ref={inputRef}
            multiple
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </Flex>
      </Box>
    );
  };

  const openPreview = (imageUrl: string) => {
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
          <img src="${imageUrl}" />
        `);
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing={5}
      align="stretch"
      p={6}
      backgroundColor="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading size="md">General Information:</Heading>
      <FormControl isRequired>
        <FormLabel>Name of the Pet</FormLabel>
        <Input
          type="text"
          value={petName}
          placeholder="e.g. John"
          onChange={(e) => setPetName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Type of the Pet</FormLabel>
        <Input
          type="text"
          value={petType}
          placeholder="e.g. Dog"
          onChange={(e) => setPetType(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Breed/Species of the Pet</FormLabel>
        <Input
          type="text"
          value={petBreed}
          placeholder="e.g. Siberian Husky"
          onChange={(e) => setPetBreed(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Age of the Pet</FormLabel>
        <Input
          type="text"
          value={petAge}
          placeholder="e.g. 3 month"
          onChange={(e) => setPetAge(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Weight of the Pet (kg)</FormLabel>
        <NumberInput
          step={0.01}
          precision={2}
          value={petWeight}
          onChange={(valueString) => setPetWeight(valueString)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Sex of the Pet</FormLabel>
        <Select
          value={petSex}
          placeholder="please select an option"
          onChange={(e) => setPetSex(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </FormControl>

      <Heading size="md">Health:</Heading>
      <FormControl isRequired>
        <FormLabel>Spaying/Neutering</FormLabel>
        <Select
          value={isSpayed}
          placeholder="please select an option"
          onChange={(e) => setIsSpayed(e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Health Status</FormLabel>
        <Input
          type="text"
          value={petHealth}
          placeholder="e.g. Any known health issues or signs of previous injuries"
          onChange={(e) => setPetHealth(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Allergies</FormLabel>
        <Input
          type="text"
          value={allergy}
          placeholder="e.g. Allergies"
          onChange={(e) => setAllergy(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Detailed Information</FormLabel>
        <Textarea
          value={detail}
          placeholder="Provide comprehensive yet relevant information that gives potential adopters a clear picture of the pet's personality, needs, and history. You could include personality overview, daily routine, how the pet interaction with humans and animals, any commands or training the pet has received, favorite activities and toys, a brief background of the pet, adaptability, and any additional needs."
          onChange={(e) => setDetail(e.target.value)}
        />
      </FormControl>
      <Flex
        wrap="wrap"
        gap={4}
        align="stretch"
        // justify="content-start"
        maxW="1024px"
      >
        {imagePreviews.map((preview, index) => (
          <Box key={index} position="relative">
            <Skeleton isLoaded={!uploadingImages}>
              <Image
                src={preview}
                alt={`Preview ${index}`}
                boxSize="165px"
                rounded={"md"}
                overflow={"hidden"}
                objectFit="cover"
                onClick={() => openPreview(preview)}
              />
            </Skeleton>
            <CloseButton
              boxSize={5}
              position="absolute"
              right="0"
              top="0"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                cursor: "pointer",
                backgroundColor: "rgba(144, 144, 144, 0.5)",
                borderRadius: "50%",
              }}
              onClick={() => removeImage(index)}
            />
          </Box>
        ))}
        {imagePreviews.length < 12 && <ImageUploadPlaceholder />}
      </Flex>

      <Button colorScheme="teal" type="submit">
        Send Message
      </Button>
    </VStack>
  );
};

export default CreatePetInfo;
