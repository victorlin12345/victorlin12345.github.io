import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './routers/RootLayout'
import NewPost from './routers/NewPost.jsx'
import Posts, {loader as PostLoader} from './routers/Posts.jsx'
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
          loader: () => {console.log('loading posts'); return PostLoader();}, 
          children: [{ path: '/create-post', element: <NewPost /> }]
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
