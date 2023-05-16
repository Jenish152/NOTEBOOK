import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [user, setuser] = useState({ uname: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();
    const onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (user.password === user.cpassword) {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uname: user.uname, email: user.email, password: user.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                setuser({ uname: "", email: "", password: "", cpassword: "" })
                navigate('/');
                props.showalert('success','Account Creat SuccessFully..');
            } else {
                props.showalert('danger','Invalid User Detail!');
            }
        } else {
            props.showalert('danger','Please Enter Same Password!');
        }

    }
    return (
        <div className='container my-2'>
            <h2 className='my-3'>Create New Account</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="uname" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="uname" name='uname' value={user.uname} aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={user.email} aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={user.password} name='password' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" value={user.cpassword} name='cpassword' onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Signup