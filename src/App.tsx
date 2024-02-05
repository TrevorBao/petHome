import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from "./firebase";
import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  type Pet = {
    id: string;
    [key: string]: string;
  };

  const [petList, setPetList] = useState<Pet[]>([]);

  // Create new Pet Info
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");

  // Update Pet Info
  const [updatedPetName, setUpdatedPetName] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);

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

  const onSubmitPet = async () => {
    try {
      await addDoc(petCollectionRef, {
        breed: petBreed,
        type: petType,
        name: petName,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deletePet = async (id: string) => {
    if (!auth.currentUser) {
      console.error("No authenticated user.");
      return;
    }

    const petDocRef = doc(db, "petInfo", id);
    const petDocSnap = await getDoc(petDocRef);

    if (!petDocSnap.exists()) {
      console.error("Document does not exist.");
      return;
    }

    const petData = petDocSnap.data();
    if (petData.userId !== auth.currentUser.uid) {
      console.error(
        "Authenticated user does not match the userId of the document."
      );
      return;
    }

    try {
      await deleteDoc(petDocRef);
      console.log("Document successfully deleted.");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const updatePetName = async (id: string) => {
    try {
      const petDoc = doc(db, "petInfo", id);
      await updateDoc(petDoc, { name: updatedPetName });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFiles = async () => {
    if (fileUpload) {
      for (let i = 0; i < fileUpload.length; i++) {
        const file = fileUpload.item(i);
        if (file) {
          const fileFolderRef = ref(storage, `users/${file.name}`);
          try {
            await uploadBytes(fileFolderRef, file);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
  };

  return (
    <>
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Name of the Pet"
          onChange={(e) => setPetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type of the Pet"
          onChange={(e) => setPetType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Breed of the Pet"
          onChange={(e) => setPetBreed(e.target.value)}
        />
        <button onClick={onSubmitPet}>Submit</button>
      </div>

      <div>
        {petList.map((pet) => (
          <div key={pet.id}>
            <h1>{pet.name}</h1>
            <p>{pet.type}</p>
            <p>{pet.breed}</p>

            <button onClick={() => deletePet(pet.id)}>Delete</button>

            <input
              type="text"
              placeholder={pet.name}
              onChange={(e) => setUpdatedPetName(e.target.value)}
            />
            <button onClick={() => updatePetName(pet.id)}>Update</button>
          </div>
        ))}
      </div>

      <div>
        <input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFileUpload(e.target.files);
            }
          }}
        />
        <button onClick={uploadFiles}>Upload File</button>
      </div>
    </>
  );
}

export default App;
