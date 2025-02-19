import { PatchNotes } from "../../data/categories";
import CreatePost from "../../components/CreatePost";

const PatchManagePage = () => {
    return (
        <div>
            <h1>PatchNotes Manage Page</h1>
            <CreatePost category={PatchNotes}/>	
        </div>
    );
}
export default PatchManagePage;
