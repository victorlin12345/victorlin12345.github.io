import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from './PostList.module.css';

function PostList() {
    const posts = useLoaderData();

    return (
        <>
            {posts.length > 0 && (
                <ul className={classes.posts}>
                    {posts.map((post, index) => (
                        <Post key={index} id={post.id} body={post.body} author={post.author} />
                    ))}
                </ul>
            )}
            {posts.length === 0 && (
                <h2 style={{textAlign: 'center'}}>No posts yet. Would you like to add one?</h2>
            )
            }
        </>
    );
}

export default PostList;