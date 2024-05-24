import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    const navigate = useNavigate();
    const Logout = () => {
        Swal.fire({
            title: 'Are you sure ?',
            text: "You will be logged out from the system!",
            icon: 'Warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("email");
                navigate("/login");
                Swal.fire({
                    title: 'Logout Success',
                    text: 'You have successfully logged out',
                    icon: 'success'
                });
            }
        });
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ background: '#81689D' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://seeklogo.com/images/B/bitcoin-logo-594596D72F-seeklogo.com.png" alt="Logo" height="30" />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/" style={{ color: "white" }}>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/CardPage" style={{color:"white"}}>
                                    chart
                                </a>
                            </li> 
                        </ul>
                        <button className="btn" style={{ color: "red" }} onClick={Logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "5px" }} /> Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
