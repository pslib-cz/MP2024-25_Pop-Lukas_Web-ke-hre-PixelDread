import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import PostDetailEditSimple from "../../components/posts/PostDetailEditSimple";
import CreatePost from "../../components/posts/CreatePost";
import { getPostsByCategory } from "../../api/postService";
import { FAQ } from "../../data/categories";

const FAQ_CATEGORY_ID = 2; 

const FAQManagePage = () => {
    const [faqPostId, setFaqPostId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const handleOnClose = () => {
        fetchFAQPost();
    };
    const fetchFAQPost = async () => {
        try {
            const posts = await getPostsByCategory(FAQ_CATEGORY_ID);
            if (posts.length > 0) {
                setFaqPostId(posts[0].id); 
            }
        } catch (error) {
            console.error("Error fetching FAQ post:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        fetchFAQPost();
    }, []);

    return (
        <HelmetProvider>
            <title>FAQ Manage Page</title>
            <div>
                <h1>FAQ Manage Page</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : faqPostId ? (
                    <PostDetailEditSimple postId={faqPostId.toString()} showEditHeader={false} showEditNameButton={false} />
                ) : (
                    <CreatePost 
                        category={FAQ} 
                        onClose={handleOnClose}
                        allowedArticleTypes={{ text: true, faq: true, link: true, media: false }}
                    />
                )}
            </div>
        </HelmetProvider>
    );
};

export default FAQManagePage;
