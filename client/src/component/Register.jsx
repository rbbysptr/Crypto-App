import { NavLink } from "react-router-dom";

const FormRegister = ({ input, submit, user }) => {
    return (
        <div className="container mt-5">
            <h3 className="text-center">Register</h3>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={user.fullName}
                            onChange={input}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={user.email}
                            onChange={input}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={user.password}
                            onChange={input}
                            placeholder="Enter password"
                        />
                    </div>
                    <button className="btn btn-info btn-block" onClick={submit}>
                        Register
                    </button>
                    <p className="mt-3 text-center">
                        Already have an account? <NavLink to="/login">Login</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormRegister;
