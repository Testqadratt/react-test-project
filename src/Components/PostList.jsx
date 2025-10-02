import PostItem from './PostItem.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({ posts, title, deletePost }) => {

    if(!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Posts are not found
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) => 
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                        nodeRef={post.nodeRef}
                    >
                        <PostItem ref={post.nodeRef} number={index + 1} deletePost={deletePost} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
            
        </div>
    );
}

export default PostList;