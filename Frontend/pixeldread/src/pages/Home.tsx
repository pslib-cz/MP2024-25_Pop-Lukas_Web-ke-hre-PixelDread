import { useContext } from "react";
import { BlogContext } from "../BlogContext";
export default function Home() {
  const { state, dispatch } = useContext(BlogContext);

    console.log(state);
    return (
    <>
      <h1>PixelDread</h1>
    </>
    );
  }