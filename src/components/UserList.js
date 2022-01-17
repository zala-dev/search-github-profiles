import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { UserItem } from './UserItem';

const UserList = () => {
  const { userList, searchGithubUser } = useContext(GithubContext);

  return (
    <Wrapper className='section-center'>
      {userList?.map((useritem) => {
        return (
          <UserItem
            key={useritem.id}
            login={useritem.login}
            avatar_url={useritem.avatar_url}
            searchGithubUser={searchGithubUser}
          />
        );
      })}
    </Wrapper>
  );
};

export default UserList;

const Wrapper = styled.section`
  height: 20vh;
  padding: 1rem 2rem;
  column-gap: 10px;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;

  background-color: white;

  overflow: scroll;
`;
