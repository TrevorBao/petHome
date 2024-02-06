// import { useEffect, useState } from "react";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import Auth from "./components/Auth";
import CreatePetInfo from "./components/CreatePetInfo";
import PetCard from "./components/petCard";
// import { db } from "./firebase";

function App() {
  // type Pet = {
  //   id: string;
  //   [key: string]: string;
  // };

  // Update Pet Info
  // const [updatedPetName, setUpdatedPetName] = useState("");

  // const petCollectionRef = collection(db, "petInfo");

  // const deletePet = async (id: string) => {
  //   if (!auth.currentUser) {
  //     console.error("No authenticated user.");
  //     return;
  //   }

  //   const petDocRef = doc(db, "petInfo", id);
  //   const petDocSnap = await getDoc(petDocRef);

  //   if (!petDocSnap.exists()) {
  //     console.error("Document does not exist.");
  //     return;
  //   }

  //   const petData = petDocSnap.data();
  //   if (petData.userId !== auth.currentUser.uid) {
  //     console.error(
  //       "Authenticated user does not match the userId of the document."
  //     );
  //     return;
  //   }

  //   try {
  //     await deleteDoc(petDocRef);
  //     console.log("Document successfully deleted.");
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //   }
  // };

  // const updatePetName = async (id: string) => {
  //   try {
  //     const petDoc = doc(db, "petInfo", id);
  //     await updateDoc(petDoc, { name: updatedPetName });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "main main"`,
        md: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="coral">
        <Auth />
      </GridItem>
      <Show above="md">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        <CreatePetInfo />
        <PetCard />

        {/* <div>
          {petList.map((pet) => (
            <div key={pet.id}>


              <button onClick={() => deletePet(pet.id)}>Delete</button>

              <input
                type="text"
                placeholder={pet.name}
                onChange={(e) => setUpdatedPetName(e.target.value)}
              />
              <button onClick={() => updatePetName(pet.id)}>Update</button>
            </div>
          ))}
        </div> */}
      </GridItem>
    </Grid>
  );
}

export default App;
