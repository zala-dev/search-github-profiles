import React, { useRef } from 'react';
import styled from 'styled-components';

export const UserItem = ({ avatar_url, login, searchGithubUser }) => {
  const card = useRef(null);

  const handleClick = () => {
    const user = card.current.innerText;
    searchGithubUser(user);
  };

  return (
    <Card onClick={handleClick}>
      <img src={avatar_url} alt='avatar' />
      <p className='card-text' ref={card}>
        {login}
      </p>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  padding: 0 1rem;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    margin-bottom: 5px;
  }

  .card-text {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;
