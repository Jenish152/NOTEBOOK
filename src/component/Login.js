import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const [user, setuser] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const onchange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      setuser({ email: "", password: "" })
      navigate('/');

      props.showalert('success', 'Login SuccessFully..');
    } else {
      props.showalert('danger', 'Invalid Email Or Password Detail!');
    }
  }
  return (
    <div className='container my-2'>
      <h2 className='my-3'>Login For Continue Inotebook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={user.email} aria-describedby="emailHelp" onChange={onchange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={user.password} name='password' onChange={onchange} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form></div>
  )
}

export default Login