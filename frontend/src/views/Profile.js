import {useContext, useState} from "react";
import Content from "../components/Content";
import userContext from "../contexts/userContext";
import {useNavigate} from "react-router-dom";

export default function Profile() {
  const [password, setPassword] = useState();
  const context = useContext(userContext);
  const navigate = useNavigate();

  async function update() {
    const user = await fetch(`/api/user/${context.user.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
      credentials: "include",
    });
    context.setUser(await user.json());
    setPassword(undefined);
    navigate("/notes");
  }

  function logout() {
    fetch('/api/user/logout')
    context.setUser(undefined)
    navigate('/')
  }

  return (
    <Content>
      <h1>Update User</h1>
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
        onClick={update}
      >
        Update
      </button>
      <br />
      <button
        className="w-100 btn btn-lg btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </Content>
  );
}
