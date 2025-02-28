import { PatchNotes } from "../../data/categories";
import CreatePost from "../../components/CreatePost";
import { HelmetProvider } from "react-helmet-async";

const PatchManagePage = () => {
    const allowedArticleTypes = {
        text: true,
        faq: false,
        link: true,
        media: true
    };

    return (
        <HelmetProvider>
            <title>PatchNotes Manage Page</title>
        <div>
            <h1>PatchNotes Manage Page</h1>
            <CreatePost category={PatchNotes} allowedArticleTypes={allowedArticleTypes}/>	
        </div>
        </HelmetProvider>
    );
}
export default PatchManagePage;
