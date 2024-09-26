import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../AxiosInstance";
import { useMessage } from '../contexts/MessageContext'

export default function LoginForm({ baseURL }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  // const [msg, setMsg] = useState("");
  const phone = '080';
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const activationMsg = (
    <span>
      Your account has not been activated; Check your mail for activation link or
      Click <Link to='/auth/resend_activation'>here</Link> to resend Activation Link!
    </span>
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {email:email, password:password}

    try{
      const checkUser = await api.get(`${baseURL}/accounts/get_user/${email}/${phone}/`)
      
      if(checkUser.data.length<1){
        // setMsg('This user does not exist')
        showMessage('This user does not exist','error');
        // return msg
      } else
      if(checkUser.data[0].is_active===false){
        showMessage(activationMsg)
        // return msg
      }
    }
    catch (error){
        showMessage('An Error has Occured. Try again', 'error')
    }

    // GENERATE TOKEN
    const res = await api.post(`${baseURL}/auth/jwt/create/`, user)
    localStorage.setItem('refresh_token', res.data.refresh)
    localStorage.setItem('access_token', res.data.access)
    const access = localStorage.getItem('access_token')
    if(access){
        api.get(`${baseURL}/auth/users/me/`,{
          headers: {
            Authorization: `FRISKY ${access}`
          }
        }).then((res)=>{
          localStorage.setItem('firstname',res.data.firstname)
          localStorage.setItem('lastname',res.data.lastname)
          localStorage.setItem('email',res.data.email)
          localStorage.setItem('phone',res.data.phone)
          localStorage.setItem('user_id',res.data.id)
          navigate('/')
        })
        api.post(`${baseURL}/accounts/set_user_online/${email}/`)
      }
  };

  return (
    <>
      <div className="container-fluid booking py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6">
                      <h1 className="text-white mb-3">Login</h1>
                      {/* <h4 style={{color:"red"}}>{msg}</h4> */}
                      <form onSubmit={handleSubmit}>
                          <div className="row g-3">
                              <div className="col-md-12">
                                  <div className="form-floating">
                                      <input type="email" className="form-control bg-white border-0" id="name" placeholder="Your Email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                      />
                                      <label>Your Email</label>
                                  </div>
                              </div>
                              <div className="col-md-12">
                                  <div className="form-floating">
                                      <input type="password" className="form-control bg-white border-0" id="password" placeholder="Your Password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                      />
                                      <label>Your Password</label>
                                  </div>
                              </div>
                              <div className="col-12">
                                  <button className="btn btn-primary text-white w-100 py-3" type="submit">Login</button>
                              </div>
                          </div>
                      </form>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    </>
  );
}
