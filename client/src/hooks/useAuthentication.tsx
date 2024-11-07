import { useState, useEffect } from "react";
import axios from "axios"; // Or fetch, based on your choice

const useAuthentication = () => {
  const [authUser, setAuthUser] = useState<any | null>(null); // Adjust type as needed

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Optional: Validate token by calling an endpoint
      axios
        .get("/api/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // If token is valid, set the user data
          setAuthUser(response.data.user);
        })
        .catch(() => {
          // If token is invalid, remove it and set authUser to null
          localStorage.removeItem("authToken");
          setAuthUser(null);
        });
    } else {
      setAuthUser(null);
    }
  }, []);

  return authUser;
};

export default useAuthentication;



// import { useState, useEffect } from "react";
// import { auth } from "../firebase";
// import { User, onAuthStateChanged } from "firebase/auth";

// const useAuthentication = () => {
//   const [authUser, setAuthUser] = useState<User | null>(null);

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user);
//       } else {
//         setAuthUser(null);
//       }
//     });
//     return () => {
//       listen();
//     };
//   }, []);
//   return authUser;
// };

// export default useAuthentication;
