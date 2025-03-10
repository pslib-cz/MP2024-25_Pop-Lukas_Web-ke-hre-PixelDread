
import { HelmetProvider } from "react-helmet-async"
import PostDetailEditSimple from "../../components/PostDetailEditSimple";
const FAQManagePage = () => {
    return(
        <HelmetProvider>
            <title>FAQ Manage Page</title>
        <div>
            <h1>FAQ Manage Page</h1>
            <PostDetailEditSimple postId="1" showEditHeader={false} showEditNameButton={false}/>        
        </div>
        </HelmetProvider>

    );
}
export default FAQManagePage;
