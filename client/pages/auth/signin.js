import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await doRequest()
    }

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errors}
            <button type="submit" className="btn btn-primary mt-2">Sign In</button>
        </form>
    )
}

export default SignIn;