import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default function Url() {
  const history = useHistory();
  const [allUrls, setAllUrls] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  useEffect(() => {
    const headersList = {
      Accept: "*/*"
    };

    // getting all the mentors
    fetch("https://url-shortener-link.herokuapp.com/url/", {
      method: "GET",
      headers: headersList
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        setAllUrls(data);
      })
      .catch((e) => console.log(e));
  }, [isClick]);

  const onShortUrlClick = (shortUrl) => {
    fetch(`https://url-shortener-link.herokuapp.com/url/shortUrl/${shortUrl}`, {
      method: "GET"
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setIsClick(!isClick);
        window.open(data, "_blank");
        //setAllUrls(data);
      })
      .catch((e) => console.log(e));
  };

  const handleSubmit = () => {
    if (longUrl) {
      creatUrl();
    } else {
      alert("Please enter the url");
    }
  };
  function creatUrl() {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json"
    };
    fetch(`https://url-shortener-link.herokuapp.com/url/create`, {
      method: "POST",
      body: JSON.stringify({
        longUrl: longUrl
      }),
      headers: headersList
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.shortUrl) {
          alert("Short Url is - " + data.shortUrl);
          setLongUrl("");
          setIsClick(!isClick);
        } else {
          alert("Url is already exists");
        }
      })
      .catch((e) => console.log(e));
  }
  const deleteUrl = (id) => {
    fetch(`https://url-shortener-link.herokuapp.com/url/delete/${id}`, {
      method: "GET"
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        alert(data.message);
        setIsClick(!isClick);
        //setAllUrls(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1>URL Shortner</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form action="/create" method="POST">
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="longurl"
                  className="form-control mr-4"
                  placeholder="Enter the URL"
                  onChange={(e) => setLongUrl(e.target.value)}
                  value={longUrl}
                />
                <button
                  className="btn btn-outline-success"
                  type="button"
                  id="button-addon2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          {!allUrls.length ? (
            <h2>Loading...</h2>
          ) : (
            allUrls.map((url) => (
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div
                  className="card text-dark bg-light mb-3"
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card-header">
                    Total clicks : {url.clickCount}
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">
                      <p
                        className="text-success"
                        style={{ cursor: "pointer" }}
                        onClick={() => onShortUrlClick(url.shortUrl)}
                      >
                        <b className="text-dark">Short-Url : </b>
                        https://{url.shortUrl}
                      </p>
                    </h6>
                    <p className="card-text">
                      <b className="text-dark">Long-Url : </b>
                      {url.longUrl}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteUrl(url._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
