import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ROOT_URL, USER_SEARCH_URL } from '../utils/config';

// const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [userList, setUserList] = useState(null);
  const [githubUser, setGithubUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });

  // get the list of users based on the query
  const getUserList = async (user) => {
    try {
      toggleError();
      const response = await fetch(`${ROOT_URL}${USER_SEARCH_URL}${user}`);
      if (!response.ok) throw new Error('User list not found');
      const { items } = await response.json();
      if (!items.length) {
        toggleError(true, 'user not found');
      } else {
        setUserList(items);
      }
    } catch (error) {
      alert(error);
    }
  };

  // search user
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${ROOT_URL}/users/${user}`).catch((error) =>
      alert(error)
    );

    if (response) {
      setGithubUser(response.data);

      const { login, followers_url } = response.data;

      //get repos
      const getRepos = axios(`${ROOT_URL}/users/${login}/repos?per_page=100`);

      //get followers
      const getFollowers = axios(`${followers_url}?per_page=100`);

      await Promise.allSettled([getRepos, getFollowers])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }

          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => alert(err));
    } else {
      toggleError(true, 'user not found');
    }
    checkRequests();
    setIsLoading(false);
  };

  // check request rate limit
  const checkRequests = () => {
    axios(`${ROOT_URL}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => alert(err));
  };

  // control error state
  const toggleError = (show = false, message = '') => {
    setError({ show, message });
  };

  // display requests stats on load
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        getUserList,
        searchGithubUser,
        isLoading,
        userList,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
