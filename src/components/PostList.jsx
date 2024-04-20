import { useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";
import classes from './PostList.module.css';

function PostList({isPosting, onClosePost}) {
    const [posts, setPosts] = useState([])

    function addPostHandler(postData) {
        console.log(postData);
        {/* 如果是 new status 是 base on old status，需要用 function 
        因為 status 更新是非同步的，如果直接用 [postData, ...posts] 會有問題
        給一個 function 參數，這個 function 會接收到最新的 status
        prevPosts 是之前的 snapshot
        */}
        setPosts((prevPosts) => {
            return [postData, ...prevPosts]
        });
    }
    return (
        <>
            {isPosting && <Modal onClose={onClosePost}>
                <NewPost
                    onCancel={onClosePost}
                    onSubmit={addPostHandler}
                />
            </Modal>}

            <ul className={classes.posts}>
                {posts.map((post, index) => (
                    <Post key={index} body={post.body} author={post.author} />
                ))}
            </ul>
        </>
    );
}

export default PostList;