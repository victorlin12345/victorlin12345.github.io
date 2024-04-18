import classes from './Post.module.css';

const names = ["Victor", "Jhon"];

function Post(props) {
    return (<li className={classes.post}>
        <p className={classes.author}>{props.author}</p>
        <p className={classes.body}>{props.body}</p>
    </li>
    );
}

export default Post;