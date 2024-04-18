import React, { useState } from 'react'
import PostList from './components/PostList'
import MainHeader from './components/MainHeader'

function App() {
  const [modalIsVisable, setVisableModel] = useState(false);

  function openModalHandler() {
    setVisableModel(true);
  }

  function closeModalHandler() {
    setVisableModel(false);
  }

  return(
  <>
    <MainHeader onCreatePost={openModalHandler}/>
    <main>
      <PostList isPosting={modalIsVisable} onClosePost={closeModalHandler}/>
    </main>
  </>
  );
}

export default App
