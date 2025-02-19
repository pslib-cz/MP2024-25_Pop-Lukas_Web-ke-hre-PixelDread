import CreatePost from "../../components/CreatePost";
import { FAQ } from "../../data/categories";

const FAQManagePage = () => {
    return(
        <div>
            <h1>FAQ Manage Page</h1>
            <CreatePost category={FAQ}/>	
        </div>
    );
}
export default FAQManagePage;
