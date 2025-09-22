import NotSignedIn from "../user-data/NotSignedIn";
import UserSignedIn from "../user-data/UserSignedIn";
import { useAuth } from "@/app/hooks/useAuth";



export default function ProfileControls() {
  const { user } = useAuth();


  return (
    <>
      {user ? <UserSignedIn /> : <NotSignedIn />}
    </>
  );
}