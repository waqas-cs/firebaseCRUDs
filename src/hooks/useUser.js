import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../firebase";
const UserCol = collection(firestore, "Users");
export const useUser = (refresh = false) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get a list of users from your database
    (async () => {
      const UserSnapshot = await getDocs(UserCol);
      const userDocs = UserSnapshot?.docs.map((doc) => doc);
      setUsers(userDocs);
    })();
  }, [refresh]);

  return { users };
};
