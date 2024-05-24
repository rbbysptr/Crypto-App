import { Outlet } from "react-router-dom";
import Navbar from "../component/NavbarComponent/Navbar"

export default function RootLayout() {
  return (
    <div>
      <Navbar/>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

