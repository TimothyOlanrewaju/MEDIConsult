import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../AxiosInstance';

const ChatList = ({ baseURL }) => {
    const [chatPartners, setChatPartners] = useState([]);
    
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('access_token')
    const currentUser = localStorage.getItem('user_id')

    if(email === null){                       
        navigate('/login')
    } 

    useEffect(() => {
        const fetchChatPartners = async () => {
          try {
            const response = await api.get(`${baseURL}/consultations/chat_list/${currentUser}/`, {
              headers: {
                Authorization: `FRISKY ${localStorage.getItem('access_token')}`
              }
            });
            setChatPartners(response.data.chat_partners);
          } catch (error) {
            console.error('Error fetching chat partners:', error);
          }
        };
    
        fetchChatPartners();
      }, []);

    return (
        <>
            <main className="content">
                <div className="container p-0">

                    <h1 className="h3 mb-3">Messages</h1>
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-12 col-lg-5 col-xl-3 border-right">

                                <div className="px-4 d-none d-md-block">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <input type="text" className="form-control my-3" placeholder="Search..." />
                                        </div>
                                    </div>
                                </div>
                                {chatPartners.map((partner)=>(
                                    <Link to={`/message/${partner.id}`} className="list-group-item list-group-item-action border-0">
                                        <div className="badge bg-success float-right">5</div>
                                        <div className="d-flex align-items-start">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                                            <div className="flex-grow-1 ml-3">
                                                {partner.name}
                                                <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                <hr className="d-block d-lg-none mt-1 mb-0" />
                            </div>
                            <div className="col-12 col-lg-7 col-xl-9">
                                {/* <div className="py-2 px-4 border-bottom d-none d-lg-block">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="position-relative">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                        </div>
                                        <div className="flex-grow-1 pl-3">
                                            <div className="text-muted small"><em>Typing...</em></div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="position-relative text-center">
                                    <div className="chat-messages p-4">
                                        <h3><i>Select a user to start chatting</i></h3>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <br />
        </>
    );
}

export default ChatList