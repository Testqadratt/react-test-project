import React from 'react'
import MyInput from '../Components/UI/input/MyInput'
import MyButton from '../Components/UI/button/MyButton'
import { AuthContext } from '../context';

function Login() {
    const {isAuth, setIsAuth} = React.useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('AUTH', 'true');
    }

    return (
      <div>
          <h1>Login page</h1>
          <form onSubmit={login}>
              <MyInput type='text' placeholder='Login'></MyInput>
              <MyInput type='password' placeholder='Password'></MyInput>
              <MyButton>Log in</MyButton>
          </form>
      </div>
    )
}

export default Login