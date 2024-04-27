import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './routers/RootLayout'
import NewPost, {action as newPostAction} from './routers/NewPost.jsx'
import Posts, {loader as PostLoader} from './routers/Posts.jsx'
import PostDetails, {loader as PostDetailLoader} from './routers/PostDetail.jsx'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/', 
          element: <Posts />,
          loader: PostLoader, 
          children: [
            { path: 'create-post', element: <NewPost />, action: newPostAction},
            { path: ':id', element: <PostDetails />, loader: PostDetailLoader},
        ]
        },
      ]
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
