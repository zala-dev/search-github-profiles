import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} alt='github user' />
        <h1>Search Github Profiles</h1>
        <button className='btn' onClick={loginWithRedirect}>
          login / sign up
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }

  h1 {
    margin-top: -1.5rem;
    margin-bottom: 2rem;
    font-size: 3rem;
  }
`;
export default Login;
