import { createContext, useReducer, useState, useEffect } from "react";
import firebase from "../firebase-config";

// initial state for rooms
const initialState = {
  isLoading: false,
  rooms: [
    { id: 1, name: "The Hunted Sugar", price: 5.0, photo: "room1.jpg" },
    { id: 2, name: "Luicys's House", price: 10.0, photo: "room2.jpg" },
    { id: 3, name: "Super Hugo Hundred", price: 16.0, photo: "room3.jpg" },
    { id: 4, name: "Bizzy's Box", price: 12.0, photo: "room4.jpg" },
    { id: 4, name: "Dark Fox", price: 22.0, photo: "room5.jpg" },
    { id: 4, name: "Sweet Candle", price: 22.0, photo: "room6.jpg" },
  ],
};

// reducers for room
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_ROOMS":
      return state;

    case "LOAD_ROOM":
      return state.find((room) => room.id === action.payload);

    default:
      throw new Error("Cannot reduce !!!");
  }
};

export const RoomContext = createContext();
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoading(false);
      const { email, displayName: name } = user;
      setUser({ email, name });
    });
  }, []);

  return <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>;
};

const RoomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(firebase.auth().currentUser);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
