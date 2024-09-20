// ActivationPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivationPage = ({ baseURL }) => {
  const { uid, token } = useParams();
  const navigate = useNavigate()
  const [msg, setMsg] = useState('Activating your account...')

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post(`${baseURL}/auth/users/activation/`, {
          uid,
          token
        });
        setMsg('Activation Successful')
        // alert('Account activated successfully!');
        navigate('/login')
      } catch (error) {
        console.error('Activation error:', error);
      }
    };

    activateAccount();
  }, [uid, token]);

  return (
    <div className='text-center'> <br /><br /><br /><br />
      <h1>{msg}</h1>
      <br /><br />
    </div>
  );
};

export default ActivationPage;
