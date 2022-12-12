import {useContext, useState} from "react";
import Content from "../components/Content";
import userContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('')
  const context = useContext(userContext);
  const navigate = useNavigate();

  async function register() {
    const user = await fetch("/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
    const json = await user.json()
    if(!json.id) {
      setError(json.msg)
      return
    }

    context.setUser(json);
    setUsername(undefined);
    setPassword(undefined);
    navigate("/notes");
  }

  return (
    <Content>
      <h1>Register</h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <br />
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingInput"
          placeholder="****"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="floatingInput">Password</label>
      </div>
      <br />
      <button
        className="w-100 btn btn-lg btn-primary"
        type="submit"
        onClick={register}
      >
        Register
      </button>
      <br />
      <p style={{color: 'red'}}>{error}</p>
    </Content>
  );
}
