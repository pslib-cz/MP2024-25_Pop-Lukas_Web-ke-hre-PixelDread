import CreatePost from "../../components/CreatePost";
import { Blog } from "../../data/categories";

const BlogManagePage = () => {
    return (
        <>
            <h1>Blog Manage Page</h1>
            <CreatePost category={Blog}/>    
        </>
    );
}
export default BlogManagePage;
