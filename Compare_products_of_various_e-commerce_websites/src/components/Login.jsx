import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(props) {

  let { showAlert } = props;

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    props.setProgress(20);

    e.preventDefault(); // To avoid page reloading

    let url = "http://localhost:3000/api/auth/loginuser";

    props.setProgress(40);


    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    props.setProgress(70);

    const json = await response.json();

    props.setProgress(100);

    if (json.success) {
      showAlert("User Logged In Successfully", "success");
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
    } else {
      showAlert("Enter Valid Login Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label"
            value={credentials.email}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label"
            value={credentials.password}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
