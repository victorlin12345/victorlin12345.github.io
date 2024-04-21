import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from './PostList.module.css';

function PostList() {
    const posts = useLoaderData();

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
            {posts.length > 0 && (
                <ul className={classes.posts}>
                    {posts.map((post, index) => (
                        <Post key={index} body={post.body} author={post.author} />
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