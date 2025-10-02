import React from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

function PostForm({addPost}) {
    const [post, setPost] = React.useState({
        title: '',
        body: '',
        nodeRef: React.createRef(null)
    });
    
    function addNewPost(e) {
        e.preventDefault();
        const newPost =  { ...post, id: Date.now() };
        setPost({
          title: '',
          body: '',
          nodeRef: React.createRef(null)
        });
        addPost(newPost);
    }
    
    return (
        <form>
          {/*Управляемый компонент*/}
          <MyInput
            type='text'
            placeholder='Title'
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
          />
          <MyInput
            type='text'
            placeholder='body'
            value={post.body}
            onChange={e => setPost({ ...post, body: e.target.value })}
          />
          <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    )
}

export default PostForm