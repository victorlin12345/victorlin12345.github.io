import PostList from '../components/PostList'
import { Outlet } from 'react-router-dom';

function Posts() {
  return(
  <>
   <Outlet />
    <main>
      <PostList/>
    </main>
  </>
  );
}

const postData = [];

export default Posts;

export function loader() {
  // const response = await fetch('http://localhost:8080/posts');
  // const resData = await response.json();
  // return resData.posts;
  return postData;
}


export function appendPost({post}) {
  postData.push(post);
}

export function getPostLen() {
  return postData.length;
}

export function getPost(id) {
  const res = postData.at(Number(id))
  if (!res) {
    return {
      id: '',
      author: 'Unknown',
      body: 'Post not found',
    };
  }
  return res;
}