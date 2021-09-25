import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function Activation() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  let headersList = {
    "Content-Type": "application/json"
  };
  useEffect(() => {
    fetch("https://url-shortener-link.herokuapp.com/auth/activation", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: headersList
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.message) {
          alert(data.message);
          //history.push("/url");
          setLoading(false);
        } else {
          alert(data.error);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mx-auto card p-4 mt-4">
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <>
          <h3 className="text-center">Activation done successfully</h3>
          <img
            className="mx-auto"
            alt="activation"
            src="https://us.123rf.com/450wm/panyamail/panyamail1812/panyamail181200644/114283334-check-mark-symbol-check-box-icon.jpg?ver=6"
          />
          <button
            className="btn-lg btn-success mx-auto"
            onClick={() => history.push("/url")}
          >
            Home
          </button>{" "}
        </>
      )}
    </div>
  );
}
