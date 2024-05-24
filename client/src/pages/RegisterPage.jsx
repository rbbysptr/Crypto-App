import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../feature/user/userSlice";
import FormRegister from "../component/Register";

const Register = () => {
    const [getUser, setUser] = useState([
        {
            username: "",
            email: "",
            password: "",
        },
    ]);
    const dispatch = useDispatch();
    const handleInput = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setUser({
            ...getUser,
            [key]: value,
        });
    };
    const nav = useNavigate();
    const handleSubmit = () => {
        dispatch(register(getUser, nav));
        // nav("/login");
    };
    return (
        <div>
            <FormRegister user={getUser} input={handleInput} submit={handleSubmit} />
        </div>
    );
};
export default Register;
