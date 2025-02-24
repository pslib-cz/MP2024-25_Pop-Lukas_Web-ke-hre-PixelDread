import CreatePost from "../../components/CreatePost";
import { FAQ } from "../../data/categories";
import { HelmetProvider } from "react-helmet-async";
const FAQManagePage = () => {
    return(
        <HelmetProvider>
            <title>FAQ Manage Page</title>
        <div>
            <h1>FAQ Manage Page</h1>
            <CreatePost category={FAQ}/>	
        </div>
        </HelmetProvider>

    );
}
export default FAQManagePage;
