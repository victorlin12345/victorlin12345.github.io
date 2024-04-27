import {Link, Form, redirect} from 'react-router-dom';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';
import {appendPost, getPostLen} from './Posts';

function NewPost() {

    return (
        <Modal>
            <Form method="post" className={classes.form}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" name="body" required rows={3} />
                </p>
                <p>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" name="author" required />
                </p>
                <p className={classes.actions}>
                    <Link to=".." type="button">Cancel</Link>
                    {/* button 沒加上 type 在 form 中，預設就會送出 submit */}
                    <button>Submit</button>
                </p>
            </Form>
        </Modal>
    );
}

export default NewPost;

export async function action({request}) {
   const formData = await request.formData();
   const postData =Object.fromEntries(formData); // {body: ..., author: ...}
   postData.id = getPostLen().toString();
   console.log(postData);
   appendPost({post: postData});
//    await fetch('http://localhost:8080/posts', {
//          method: 'POST',
//          body: JSON.stringify(postData),
//          headers: {
//               'Content-Type': 'application/json'
//          }
//     });

    return redirect('/');
}