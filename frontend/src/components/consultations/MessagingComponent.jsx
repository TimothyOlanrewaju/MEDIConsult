import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../AxiosInstance';

const MessagingComponent = ({ baseURL }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate()
    const {id} = useParams()
    const email = localStorage.getItem('email')

    if(email === null){                       
        navigate('/login')
    } 

    const chatPartner = parseInt(id)
    const currentUser = localStorage.getItem('user_id')
    
    // Fetch messages initially and on a regular interval
    useEffect(() => {
        const fetchMessages = () => {
            api.get(`${baseURL}/consultations/get_receiver/${currentUser}/${chatPartner}/`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => console.log(error));
        };

        fetchMessages(); // Fetch messages when component mounts

        const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [chatPartner]);

    const sendMessage = (e) => {
        e.preventDefault()
        api.post(`${baseURL}/consultations/`, {
            sender:currentUser,
            receiver: chatPartner,
            content: newMessage,
        }).then(response => {
            setMessages([...messages, response.data]);
            setNewMessage('');
        }).catch(error => console.log(error));
    };

    useEffect(() => {
        const chatWindow = document.querySelector('.chat-messages');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, [messages]);

    return (
        <>
            <br /><br /><br />
            <div className='chat-container'> 
                <div className="chat-list">
                    <h4>Chat List</h4>
                </div>
                <div className="chat-window">
                    <div className="chat-header">Consultation with {chatPartner}</div>
                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${parseInt(msg.sender) === parseInt(currentUser) ? 'text-right' : 'text-left'}`}>
                                <p>
                                    <span>
                                        <p>{
                                            msg.content}
                                            <span style={{fontSize:"x-small", textIndent:"1em"}}>
                                                {new Date(msg.timestamp).toLocaleTimeString()}
                                            </span>
                                        </p>
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <form action="" className='chat-input'>
                        <input 
                            type="text" 
                            value={newMessage} 
                            onChange={e => setNewMessage(e.target.value)} 
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </form>
                    <br /><br />
                </div>
                <div className="chat-list">
                    <h4>Bio of ChatPartner</h4>
                </div>
            </div>
        </>
    );
}

export default MessagingComponent;
