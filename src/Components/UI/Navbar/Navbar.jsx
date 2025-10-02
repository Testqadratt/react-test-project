import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../button/MyButton'
import { AuthContext } from '../../../context';

function Navbar() {
  const {isAuth, setIsAuth} = React.useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('KEY');
  }

  return (
    <div className='navbar'>
      <MyButton onClick={logout}>
        Log out
      </MyButton>
      <div className='navbar__links'>
        <Link to='/about'>About</Link>
        <Link to='/Posts'>Posts</Link>
      </div>
    </div>
  )
}

export default Navbar