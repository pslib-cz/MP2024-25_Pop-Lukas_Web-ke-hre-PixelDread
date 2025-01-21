import { useContext } from "react";
import { BlogContext } from "../BlogContext";
import styles from "./Home.module.css"
import PublicNavbar from "../components/PublicNavbar";
const Home = () => {

    return (
    <>
      <div className="flex column">
            <PublicNavbar />

            <div className={styles.heroContainer}>

                  <h1>PIXELDREAD</h1>
      
            </div>
      </div>
    </>
    );
  }
export default Home