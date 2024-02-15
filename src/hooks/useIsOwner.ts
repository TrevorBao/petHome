import { useParams } from "react-router-dom";
import { auth } from "../firebase";


interface Props {
    isOwner: boolean;
  }

const useIsOwner = (): Props => {
  const { id } = useParams();
  const isOwner = auth?.currentUser?.uid === id;

  return {isOwner};
};

export default useIsOwner;