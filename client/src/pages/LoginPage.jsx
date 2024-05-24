import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../feature/user/userSlice";
import FormLogin from "../component/Login";
import Swal from "sweetalert2";

const LoginPage = () => {
    const [getUser, setUser] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser({
            ...getUser,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        dispatch(login(getUser, nav)); 
    };
    async function handleCredentialResponse(response) {
        try {
            const { data } = await axios({
            method:"POST",
                url: import.meta.env.VITE_API_BASE_URL + "/google-login",
            headers:{
                google_token:response.credential,
            },
           });
            console.log(data);
            localStorage.access_token = data.access_token;
            nav("/")
            Swal.fire({
                title: 'Success',
                text: 'Login Successfuly',
                icon: 'success',
            });
        }catch(error){
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'error ',
                icon: 'error',
            });
        }
    }
    function loadGithubButton() {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get("code");
        if (codeParam && localStorage.getItem("access_token") == null) {
            async function getAccessToken() {
                try {
                    const { data } = await axios({
                        method: "GET",
                        url:
                            import.meta.env.VITE_API_BASE_URL +
                            "/github-login?code=" +
                            codeParam,
                    });
                    if (data.access_token) {
                        localStorage.setItem("access_token", data.access_token);
                        localStorage.email = data.email;
                    }
                    nav("/");
                    Swal.fire({
                        title: 'Success',
                        text: 'Login Successfuly',
                        icon: 'success',
                    });
                } catch (error) {
                  next(error)
                }
            }
            getAccessToken();
        }
    }
    async function loginWithGithub(event) {
        event.preventDefault();
        try {
            window.location.assign(
                "https://github.com/login/oauth/authorize?client_id=" + import.meta.env.VITE_CLIENT_ID_GITHUB
            );
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadGithubButton();
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }
            );
            google.accounts.id.prompt();
        };
    }, []);
    return (
        <div>
            <FormLogin
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                getUser={getUser}
                loginWithGithub={loginWithGithub}
            />
        </div>
    );
};

export default LoginPage;
