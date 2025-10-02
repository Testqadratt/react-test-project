import { useNavigate } from 'react-router-dom';
import MyButton from './UI/button/MyButton'

function PostItem ({ ref, ...props }) {
    const { post, number, deletePost } = props;
    
    const navigate = useNavigate();

    function transitToPost(id) {
      navigate(`/posts/${id}`, { replace: true })
    }

    return (
        <div className='post' ref={ref}>
            <div className='post__content'>
              <strong>{post.id} {post.title}</strong>
              <div>{post.body}</div>
            </div>
            <div className='post__btns'>
              <MyButton onClick={() => transitToPost(props.post.id)} >Open</MyButton>
              <MyButton onClick={(e) => deletePost(post)} >Delete</MyButton>
            </div>
        </div>
    );
}

export default PostItem;