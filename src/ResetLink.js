import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function RestLink() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://url-shortener-link.herokuapp.com/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message) {
            alert(data.message);
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
                  alt="password"
                  border="0"
                />
                <h2 className="text-center">Reset Password</h2>
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
                  </div>
                  <p className="text-danger">
                    Link will be valid for only an hour
                  </p>
                  <p className="text-secondary">
                    Kindly check inside the <b>Spam</b>
                  </p>
                  <div className="form-group">
                    <input
                      className="btn btn-lg btn-primary btn-block"
                      value="Send Email"
                      type="button"
                      onClick={handleSubmit}
                    />
                    <br />
                    <input
                      className="btn btn-secondary"
                      value="Back"
                      type="button"
                      onClick={() => history.goBack()}
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
