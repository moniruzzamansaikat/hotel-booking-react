import firebase from "../firebase-config";

export const login = ({ email, password }) => {
  const data = {
    user: null,
    message: null,
  };

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userSnap) => {
      const user = {
        name: userSnap.user.displayName,
        email: userSnap.user.email,
      };
      data.user = user;
      return data;
    })
    .catch((error) => {
      const { code } = error;
      if (code === "auth/user-not-found") {
        data.message = "No user found with this email !";
      }
      return data;
    });
};

// Google login (@GoogleAuthProvider)
export const googleLogin = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { email, displayName: name } = result.user;
      const user = { email, name };
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Create user
export const createUser = ({ fullName: name, emailAddress: email, password }) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      userCred.user.updateProfile({ displayName: name });
      return userCred.user;
    })
    .catch((error) => {
      console.log(error);
    });
};
