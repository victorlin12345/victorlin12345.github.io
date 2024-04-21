import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost({ onSubmit, onCancel }) {
    const [enteredBody, setEnteredBody] = useState("");
    const [enteredAuthor, setEnteredAuthor] = useState("");

    function bodyChangeHandler(event) {
        setEnteredBody(event.target.value);
    }

    function authorChangeHandler(event) {
        setEnteredAuthor(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        const postData = {
            body: enteredBody,
            author: enteredAuthor
        }
        onSubmit(postData)
        onCancel();
    }

    return (
        <Modal>
            <form className={classes.form} onSubmit={submitHandler}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
                </p>
                <p>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" required onChange={authorChangeHandler} />
                </p>
                <p className={classes.actions}>
                    <Link to=".." type="button">Cancel</Link>
                    {/* button 沒加上 type 在 form 中，預設就會送出 submit */}
                    <button>Submit</button>
                </p>
            </form>
        </Modal>
    );
}

export default NewPost;