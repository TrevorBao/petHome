import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  Box,
  AspectRatio,
} from "@chakra-ui/react";

const PetCard = () => {
  type Pet = {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    weight: string;
    sex: string;
    isSpayed: string;
    health?: string;
    allergy?: string;
    detail?: string;
    imageUrls?: string[];
  };

  const [petList, setPetList] = useState<Pet[]>([]);

  const petCollectionRef = collection(db, "petInfo");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      petCollectionRef,
      (snapshot) => {
        const pets: Pet[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as Pet),
          id: doc.id,
        }));
        setPetList(pets);
      },
      (err) => {
        console.error(err);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {petList.map((pet) => (
        <Box
          maxW={{
            base: "90%",
            sm: "320px",
            md: "540px",
          }} // Adjust these values as needed
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          key={pet.id}
          backgroundColor="white"
          padding={5}
          m={4}
        >
          <AspectRatio ratio={1.5}>
            <Image
              src={
                pet.imageUrls?.[0] ||
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              }
              alt={`Image of ${pet.name}`}
              objectFit="cover"
              borderRadius="lg"
            />
          </AspectRatio>
          <Divider />
          <Stack spacing={3} p={4}>
            <Heading size="md">{pet.breed}</Heading>
            <Text>{pet.age}</Text>
            <Text>{pet.name}</Text>
          </Stack>
          <Button variant="solid" colorScheme="blue" width="full" mt="auto">
            More
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default PetCard;
