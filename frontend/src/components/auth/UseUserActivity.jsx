import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const UseUserActivity = ({ baseURL }) => {
    const { search, user } = useContext(SearchContext);
    const activeUser = activeUser
    console.log('user:',activeUser)
    const email = localStorage.getItem('email')
    console.log(email)

  useEffect(() => {
    if (activeUser) {
      const interval = setInterval(() => {
        axios.post(`${baseURL}//accounts/update_activity/`, {}, {
          headers: {
            Authorization: `Token ${activeUser.token}`,
          },
        });
      }, 30000);  // 30 seconds interval

      return () => clearInterval(interval);
    }
  }, [activeUser]);
};

export default UseUserActivity;
