import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../AxiosInstance';

const OnlineUsers = ({ baseURL }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await api.get(`${baseURL}/accounts/online_users/`);
                setOnlineUsers(response.data);
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };

        fetchOnlineUsers();
        const interval = setInterval(fetchOnlineUsers, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);
    

    return (
        <>
            <div className='text-center'> <br /><br /><br /><br />
                { onlineUsers.length > 0 ?
                <>
                    <h3>Clinicians currently Online </h3>
                    <i>Click a clinician to start consultation now</i><hr />
                        {onlineUsers.map(user => (
                            <h5 key={user.id}>
                                <Link to={ `/message/${user.user_id}` }>{user.fullname} | {user.user_email}</Link>
                            </h5>
                        ))}
                </> :
                    <h2> No Clinician Online at the moment </h2>
                }
                <br />
            </div>
        </>
    );
};

export default OnlineUsers;
