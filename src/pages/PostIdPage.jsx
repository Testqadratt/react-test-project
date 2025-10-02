import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../Components/UI/Loader/Loader';

function PostIdPage() {
    const params = useParams();
    const [post, setPost] = React.useState({});
    const [comments, setComments] = React.useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
    });
    
      React.useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
      }, []);

    return (
      <div>
            <h1>Post's page with ID = {params.id} opened.</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Comments</h1>
            {isCommentsLoading
                ? <Loader/>
                : <div>{comments.map(comment => {
                    return (
                        <div key={comment.id} style={{marginTop: '15px'}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )
                })}</div>
            }
      </div>
    )
}

export default PostIdPage