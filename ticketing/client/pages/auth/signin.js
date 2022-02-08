import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    }

    return (
        <div className="container mt-3">
            <form onSubmit={onSubmit}>
                <h1>signin</h1>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                    />
                </div>

                {errors}
                
                <button className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

export default signin;