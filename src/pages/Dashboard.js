import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import UserList from '../components/UserList';
const Dashboard = () => {
  const { isLoading, githubUser, userList } = React.useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <UserList />
        <img src={loadingImage} className='loading-img' alt='loading-img' />
      </main>
    );
  }

  if (!githubUser && !userList) {
    return (
      <main>
        <Navbar />
        <Search />
        <section className='section'>
          <Heading className='section-center'>
            <h3>Lets search and get the user's details!</h3>
          </Heading>
        </section>
      </main>
    );
  }

  if (userList && !githubUser) {
    return (
      <main>
        <Navbar />
        <Search />
        <UserList />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <UserList />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;

const Heading = styled.div`
  display: grid;
  place-items: center;
  height: 40vh;

  h3 {
    color: var(--clr-grey-5);
  }
`;
