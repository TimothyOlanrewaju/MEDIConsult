import { useState, useEffect } from "react";
import { useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import {SearchContext} from '../contexts/SearchContext'
import api from "../../AxiosInstance";

const NavBar = ({ baseURL }) => {
  const { search, user } = useContext(SearchContext);
  const [ searchQuery, setSearchQuery ] = search;
  const [email, setEmail] = user
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  const [userGroup, setUserGroup] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const MessageArray = ["timothy"]

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate('/search');
  };

  useEffect(()=>{
    if(localStorage.getItem('access_token')){
        setEmail(localStorage.getItem('email'))
        setUserGroup(localStorage.getItem('user_group'))
        setFirstName(localStorage.getItem('firstname'))
        setLastName(localStorage.getItem('lastname'))
    }
  },)

//   useEffect(() => {
//     if (email) {
//         const token = localStorage.getItem('access_token')
//         const interval = setInterval(() => {
//             api.post(`${baseURL}/accounts/update_activity/`, {}, {
//             headers: {
//                 "Authorization": `FRISKY ${token}`,
//             },
//             });
//       }, 30000);  // 30 seconds interval

//       return () => clearInterval(interval);
//     }
//   }, [email]);
  
  useEffect(() => {  
      const checkAuth = () => {  
      if (localStorage.getItem('access_token') !== null) {        
          setIsAuth(true);
          setEmail(localStorage.getItem('email'))
      }else {
        setIsAuth(false);
        setEmail('');
      }
    } 
    checkAuth();
  }, [isAuth]);

  const handleSignout = () => {
    api.post(`${baseURL}/accounts/set_user_offline/${email}/`)
    localStorage.clear()
    setIsAuth(false); // Update state immediately
    setEmail(''); // Clear email state
    navigate('/')
  }

  return (
    <>
        <div className="top">
            {/* <!-- Topbar Start --> */}
            <div className="container-fluid bg-primary px-5 d-none d-lg-block">
                <div className="row gx-0">
                    <div className="col-lg-4 text-center text-lg-start mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center" style={{height: "45px"}}>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-twitter fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-facebook-f fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-linkedin-in fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-instagram fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href=""><i className="fab fa-youtube fw-normal"></i></a>  
                        </div>
                    </div>
                    <div className="navbar-search col-lg-4 mx-auto">
                        <input
                            className="form-control border-0 w-100 py-1 mt-1 ps-4 pe-5"
                            type="text"
                            placeholder="🔍 Search Item by name..."
                            // value={searchQuery}
                            // onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{height: "45px"}}>
                            { email ? 
                                <>
                                <Link style={{color:"white", marginRight:"15px"}}>
                                { MessageArray && MessageArray.length > 0 ? (
                                            <Link to="chat_list" style={{padding:"4px"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-envelope-arrow-down-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z"/>
                                          </svg></Link>
                                        ) : (
                                           <Link to="chat_list" style={{padding:"4px"}}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>
</Link>      ) 
                                        }
                                <Link to="/chat_list" style={{color:"white", textDecoration:"none"}}>Inbox</Link>
                                </Link>
                                <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-light" data-bs-toggle="dropdown"><small><i className="fas fa-user-alt me-2"></i> {email}</small></a>
                                <div className="dropdown-menu rounded">
                                    <Link to="/auth/profile" className="dropdown-item"><i className="fas fa-user-alt me-2"></i> My Profile</Link>
                                    <Link to="/chat_list" className="dropdown-item"><i className="fas fa-comment-alt me-2"></i> Inbox</Link>
                                    <a href="#" className="dropdown-item"><i className="fas fa-bell me-2"></i> Notifications</a>
                                    <a href="#" className="dropdown-item"><i className="fas fa-cog me-2"></i> Account Settings</a>
                                    <Link onClick={handleSignout} className="dropdown-item"><i className="fas fa-power-off me-2"></i> Logout</Link>
                                </div>
                            </div>
                                </>
                                :
                                <>
                                <Link to="register"><small className="me-3 text-light"><i className="fa fa-user me-2"></i>Register</small></Link>
                                <Link to="login"><small className="me-3 text-light"><i className="fa fa-sign-in-alt me-2"></i>Login</small></Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}

            {/* <!-- Navbar & Hero Start --> */}
            <div className="container-fluid position-relative p-0">
                <nav style={{backgroundColor:"grey"}} className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <Link to="/" className="navbar-brand p-0">
                        <h1 className="m-0">
                        {/* <i className="fa fa-map-marker-alt me-3"></i> */}
                        Medics
                        </h1>
                        {/* <img src="assets/img/item_default.png" alt="Logo" /> */}
                    </Link>
                    <div className="middle">
                        { email ? 
                            <div className="d-flex gap-2">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle text-light" data-bs-toggle="dropdown">
                                        <span><i className="fas fa-user-alt me-2 text-primary"></i> 
                                            {firstName}
                                        </span>
                                    </a>
                                    <div className="dropdown-menu rounded">
                                        <Link to="/auth/profile" className="dropdown-item"><i className="fas fa-user-alt me-2"></i> My Profile</Link>
                                        <Link to="/chat_list" className="dropdown-item"><i className="fas fa-comment-alt me-2"></i> Inbox</Link>
                                        <a href="#" className="dropdown-item"><i className="fas fa-bell me-2"></i> Notifications</a>
                                        <a href="#" className="dropdown-item"><i className="fas fa-cog me-2"></i> Account Settings</a>
                                        <Link onClick={handleSignout} className="dropdown-item"><i className="fas fa-power-off me-2"></i> Logout</Link>
                                    </div>
                                </div>
                                    <div style={{marginLeft:"8px"}}>
                                        { MessageArray && MessageArray.length > 0 ? (
                                            <Link to="chat_list"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1b5454" class="bi bi-envelope-arrow-down-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z"/>
                                          </svg></Link>
                                        ) : (
                                           <Link to="chat_list">
                                           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>
</Link>      )
                                        }
                                    </div>
                            </div>
                                    :
                            <>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={()=>navigate("/login")}
                                >
                                    Login
                                </button>
                            </>
                        }
                        
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                            <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                            { userGroup==="manager" ? 
                                <>
                                    <div className="nav-item dropdown">
                                        <a to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manager</a>
                                        { email ? 
                                        <>
                                            <div className="dropdown-menu m-0">
                                                <Link to="/application_list" className="dropdown-item">Application List</Link>
                                                <Link to="/orders" className="dropdown-item">Orders List</Link>
                                            </div>
                                        </> :
                                        <div className="dropdown-menu m-0">
                                            <Link to="/login">Login to continue</Link>
                                        </div>
                                        }
                                    </div> 
                                </> : ""
                            }
                            <NavLink to={email?"/apply":"/login"} className="nav-item nav-link">Apply Now</NavLink>
                            {/* <Link to="/" className="nav-item nav-link">Packages</Link> */}
                            {/* <Link to="/" className="nav-item nav-link">Blog</Link> */}
                            <div className="nav-item dropdown">
                                <a to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Orders</a>
                                { email ? 
                                    <>
                                        <div className="dropdown-menu m-0">
                                            <Link to="/place_order" className="dropdown-item">Place Order</Link>
                                            <Link to="/orders_list" className="dropdown-item">My Orders</Link>
                                        </div> 
                                    </> : 
                                    <div className="dropdown-menu m-0">
                                        <Link to="/login">Login to Place Order</Link>
                                    </div> 
                                }
                            </div>
                            <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                        </div>
                        <Link to={email ? "/auth/online_users" : "/login"} className="btn btn-primary rounded-pill py-2 px-4 ms-lg-4">Free Consultation</Link>
                    </div>
                </nav>
                <div className="bottomBar">
                    <input
                        className="form-control border-0 rounded-pill w-100 py-1 ps-4 pe-5"
                        type="text"
                        placeholder="🔍 Search for items"
                        // value={searchQuery}
                        // onChange={handleSearchChange}
                    />
                </div>
                
            </div>
        </div>
    </>
  );
};

export default NavBar;