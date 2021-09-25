import { useHistory } from "react-router-dom";

export default function PageNotFound() {
  const history = useHistory();
  return (
    <div className="container">
      <img
        style={{ height: "100%", width: "100%" }}
        src="http://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg"
      />
      <button
        className="btn-lg btn-success mx-auto"
        onClick={() => history.push("/")}
      >
        Home
      </button>
    </div>
  );
}
