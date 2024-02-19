import { useParams } from "react-router-dom";
import { auth } from "../firebase";



const useIsOwner = () => {
  const { id } = useParams();
  const isOwner = auth?.currentUser?.uid === id;

  return {isOwner};
};

export default useIsOwner;