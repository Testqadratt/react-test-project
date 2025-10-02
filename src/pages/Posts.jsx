import React from 'react';
import '../styles/App.css';
import PostList from '../Components/PostList.jsx';
import PostForm from '../Components/PostForm.jsx';
import PostFilter from '../Components/PostFilter.jsx';
import MyModal from '../Components/UI/MyModal/MyModal.jsx';
import MyButton from '../Components/UI/button/MyButton.jsx';
import { usePosts } from '../hooks/usePosts.js';
import PostService from '../API/PostService.js';
import Loader from '../Components/UI/Loader/Loader.jsx';
import { useFetching } from '../hooks/useFetching.js';
import { getPagesCount } from '../utils/pages.js';
import Pagination from '../Components/UI/pagination/Pagination.jsx';
import { useObserver } from '../hooks/useObserver.js';
import MySelect from '../Components/UI/select/MySelect.jsx';


function Posts() {
  const [filter, setFilter] = React.useState({ sort:'', query: '' });
  const [modal, setModal] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const lastElement = React.useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    const newPosts = response.data.map((post) => {
      return {...post, nodeRef: React.createRef(null)}
    });
    setPosts([...posts, ...newPosts]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page => page + 1)
  });

  React.useEffect(() => {
    fetchPosts(limit, page);
  }, [limit, page]);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  function addPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  // Принимаем post из дочернего компонента
  function deletePost(post) {
    setPosts(posts.filter(v => v.id !== post.id));
  }

  function changePage(page) {
    setPage(page);
  }

  return (
    <div className="App">
        <MyButton onClick={fetchPosts} style={{marginTop: '30px'}}>
          GET POSTS
        </MyButton>
        <MyButton onClick={() => setModal(true)} style={{marginTop: '30px'}}>
          Create post
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm addPost={addPost} />
        </MyModal>
        <hr style={{margin: '15px'}}/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue={'Number of posts per page'}
          options={[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 20, name: '20'},
            {value: -1, name: 'All'},
          ]}
        />
        {postError &&
          <h1>Error occured: {postError}</h1>
        }
        <PostList deletePost={deletePost} posts={sortedAndSearchedPosts} title={'Articles list'}/>
        <div ref={lastElement} style={{height: '20px', background: 'red'}}></div>
        {isPostsLoading &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Loader/>
          </div>
        }
        <Pagination
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />
    </div>
  );
}

export default Posts;
