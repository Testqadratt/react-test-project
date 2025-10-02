import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput
          placeholder='Search post'
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
        />
        <MySelect
          value={filter.sort}
          onChange={sort => setFilter({...filter, sort: sort})}
          defaultValue={'Sort by'}
          options={[
            {value: 'title', name:'By title'},
            {value: 'description', name:'By description'}
          ]}
        />
    </div>
  )
}

export default PostFilter;