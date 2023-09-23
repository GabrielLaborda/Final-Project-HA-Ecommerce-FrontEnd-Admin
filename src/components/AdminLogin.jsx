import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RegisterAndLogin.css";
import { login } from "../redux/adminSlice";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function AdminLogin() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("123456");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${baseURL}/login/admin`,
        method: "POST",
        data: { password, email },
      });
        dispatch(login(response.data));
        toast.success(`Welcome back, Admin! :)`, {
          position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return navigate(`/`);
      } catch (error) {
        console.log(error);
        return toast.error(`Could not login, try again`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      }
    }
    
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-sm-12 col-lg-6 text-start d-flex justify-content-center container-fluid align-items-center">
          <div className="inputWidth bg-gradient-dark">
            <form action="/login" method="post" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="form-label"></label>
                <input
                  type="text"
                  name="email"
                  id="emails"
                  className="form-control rounded-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="firstName" className="form-label"></label>
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control rounded-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="d-grid gap-1">
                <button className="btn btn-outline-light rounded-0 btn-lg" type="submit">
                  Login
                </button>
              </div>
            </form>
            <p className="text-center text-white mt-4 little-text">Email: admin@example.com</p>
            <p className="text-center text-white mt-2 little-text">Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
