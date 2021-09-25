import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    if (email && password) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://url-shortener-link.herokuapp.com/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.username) {
            alert("Hi " + data.username + " !! You are logged in ");
            history.push("/url");
          } else {
            alert(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter the fields");
    }
  };
  return (
    <div className="container-md forget-password">
      <div className="row">
        <div className="col-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
                  alt="login"
                  border="0"
                />
                <h2 className="text-center">Login</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="Email id"
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      className="btn btn-lg btn-primary btn-block"
                      value="Login"
                      type="button"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => history.push("/")}
                >
                  Signup
                </button>
                <button
                  className="btn btn-danger ml-4"
                  onClick={() => history.push("/reset")}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
