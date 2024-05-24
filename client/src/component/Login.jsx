import { NavLink } from "react-router-dom";


const FormLogin = ({ handleInput, handleSubmit, getUser, id, loginWithGithub }) => {
    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">LOGIN</h3>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="bi bi-envelope" width="16" height="16">
                                        <path fillRule="evenodd" d="M1.473 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.473-1.921L5.38 8.69a1 1 0 0 0 1.22-1.38L3.44 3.5H13a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5z" />
                                    </svg>
                                </span>
                            </div>
                            <input type="email" className="form-control" placeholder="Enter email" name="email" value={getUser.email} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="bi bi-lock" width="16" height="16">
                                        <path d="M2.5 6a1.5 1.5 0 0 1 3 0v3H2v-3a1.5 1.5 0 0 1 3 0v3h1V6a3 3 0 0 0-6 0v3h1V6zm11-4h-1v1h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h-1V5a1 1 0 0 0-1-1z" />
                                    </svg>
                                </span>
                            </div>
                            <input type="password" className="form-control" placeholder="Enter password" name="password" value={getUser.password} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between"> 
                        <button type="button" className="btn btn-success btn-block" onClick={handleSubmit}>Login</button>
                        <button type="button" className="btn btn-dark btn-block" style={{ color: 'white' }} onClick={loginWithGithub}>Login with GitHub</button>
                        <div id="buttonDiv"></div>
                    </div>
                    <p className="mt-3 text-center">Don't have an account yet? <NavLink to="/register">Register</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
