import { useContext } from "react";
import { BlogContext } from "../BlogContext";
import Navbar from "../components/Navbar";
export default function Home() {
  const { state, dispatch } = useContext(BlogContext);

    console.log(state);
    return (
    <>
          <Navbar />

          <h1>PixelDread</h1>
      
    </>
    );
  }