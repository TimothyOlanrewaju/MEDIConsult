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
                const filteredUsers = response.data.filter(user => parseInt(user.user) !== parseInt(userId))
                setOnlineUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };

        fetchOnlineUsers();
        const interval = setInterval(fetchOnlineUsers, 60000); // Refresh every 30 seconds

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
                            <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-3 mb-4">
                                    <div className="column-header bg-primary text-white text-center">Doctors</div>
                                    <div className="column-item">🟢 Doctor 1</div>
                                    <div className="column-item">🟢 Doctor 2</div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="column-header bg-primary text-white text-center">Pharmacists</div>
                                    <div className="column-item">🟢 Pharmacist 1</div>
                                    <div className="column-item">🟢 Pharmacist 2</div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="column-header bg-primary text-white text-center">Medical Lab Scientists</div>
                                    <div className="column-item">🟢 MLS 1</div>
                                    <div className="column-item">🟢 MLS 2</div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="column-header bg-primary text-white text-center">Nurses</div>
                                    <div className="column-item">🟢 Nurse 1</div>
                                    <div className="column-item">🟢 Nurse 2</div>
                                </div>
                            </div>
                        </div>
                </> :
                    <h2> No Clinician Online at the moment </h2>
                }
                <br />
            </div>
        </>
    );
};

export default OnlineUsers;
