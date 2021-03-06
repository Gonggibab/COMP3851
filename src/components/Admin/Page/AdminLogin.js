import { useEffect, useState } from "react";
import logo from "../../../logo.png";
import "./AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";
import HttpRequest from '../../../HttpRequest';
import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function AdminLogin() {

  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [redirect, setRedirect] = useState(false)

  let navigate = useNavigate();


  function validateForm() {
    return text.length > 0 && password.length > 0;
  }

  const Login = (e) => {
    e.preventDefault();

    HttpRequest.post("http://localhost:5000/api/admin/login", {
      adminId: adminId,
      password: password
    }).then(res => {
      //alert(res.data.status);
      setRedirect(true);
    })
      .catch(error => {
        // alert(error.response.data.error);
        setLoginStatus('ID or Password is incorrect!');
        setRedirect(false);
      })
  };

  useEffect(() => {
    if (redirect) {
      return navigate("/admin/home")
    }
  }, [redirect]);

  return (
    <div className="AdminLogin">
      <div className="container">
        <Link
          key="link__home"
          className="link__home"
          to="/"
        >
          <img src={logo} className="logo" alt="logo" />
        </Link>

        <form className="login_form">
          <div className="font">Admin ID</div>
          <input
            type="text"
            onChange={(e) => {
              setAdminId(e.target.value);
            }}
          />

          <div className="font font2">Password</div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit" disabled={!validateForm()} onClick={Login}>
            Login
          </button>
          {loginStatus && (
            <>
              <div className="errormsg">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ paddingRight: "5px" }}
                ></FontAwesomeIcon>
                {loginStatus}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;