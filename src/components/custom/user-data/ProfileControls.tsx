import NotSignedIn from "./NotSignedIn";
import UserSignedIn from "./UserSignedIn";
import { useAuth } from "@/app/hooks/useAuth";



export default function ProfileControls() {
  const { user } = useAuth();


  return (
    <>
      {user ? <UserSignedIn /> : <NotSignedIn />}
    </>
  );
}