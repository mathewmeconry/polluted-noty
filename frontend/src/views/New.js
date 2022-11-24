import {useContext, useState} from "react";
import Content from "../components/Content";
import userContext from "../contexts/userContext";
import {useNavigate} from "react-router-dom";

export default function New() {
  const [note, setNote] = useState();
  const context = useContext(userContext);
  const navigate = useNavigate();

  async function save() {
    const user = await fetch("/api/note/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note,
      }),
      credentials: "include",
    });
    context.setUser(await user.json());
    setNote(undefined);
    navigate("/notes");
  }

  return (
    <Content>
      <h1>New Note</h1>
      <div className="form-floating">
        <textarea
          className="form-control"
          id="floatingInput"
          placeholder="Username"
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
        />
        <label htmlFor="floatingInput">Note</label>
      </div>
      <br />
      <button
        className="w-100 btn btn-lg btn-primary"
        type="submit"
        onClick={save}
      >
        Save
      </button>
    </Content>
  );
}
