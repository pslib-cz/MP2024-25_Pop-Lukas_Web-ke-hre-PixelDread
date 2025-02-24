import { PatchNotes } from "../../data/categories";
import CreatePost from "../../components/CreatePost";
import { HelmetProvider } from "react-helmet-async";

const PatchManagePage = () => {
    return (
        <HelmetProvider>
            <title>PatchNotes Manage Page</title>
        <div>
            <h1>PatchNotes Manage Page</h1>
            <CreatePost category={PatchNotes}/>	
        </div>
        </HelmetProvider>
    );
}
export default PatchManagePage;
