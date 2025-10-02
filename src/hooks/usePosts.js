import React from 'react';

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = React.useMemo(() => {
        if (sort.length)
            return [...posts].sort((post1, post2) => post1[sort].localeCompare(post2[sort]));
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = React.useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}
