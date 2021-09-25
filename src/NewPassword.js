import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./styles.css";

export default function NewPassword() {
  const { restToken } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://url-shortener-link.herokuapp.com/auth/new-password", {
        method: "POST",
        body: JSON.stringify({ password: password, token: restToken }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message) {
            alert(data.message);
            history.push("/login");
          } else {
            alert(data.error);
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
        <div className="col-md-12 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  src="http://cdn.onlinewebfonts.com/svg/img_398183.png"
                  alt="signup"
                  border="0"
                />
                <h2 className="text-center">New Password</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="New Password"
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
                      value="Reset Password"
                      type="button"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
