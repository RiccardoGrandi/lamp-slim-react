import "./App.css";
import Alunno from "./Alunno";
import { useState, useEffect } from "react";
import FormDiInserimento from "./FormDiIserimento";

function App() {
  useEffect(() => {
    popolaAlunni();
  }, []);

  const [alunni, setAlunni] = useState([]);
  const [pronto, setPronto] = useState(false);
  const [insertForm, setInsertForm] = useState(false);
  const [alunno, setAlunno] = useState(null);

  async function popolaAlunni() {
    const response = await fetch("http://localhost:8080/alunni", {
      method: "GET",
    });
    const array = await response.json();
    setAlunni(array);
    setPronto(true);
  }

  function noUpdate() {
    setInsertForm(false);
    setAlunno(null);
  }

  return (
    <div className="App">
      {pronto ? (
        <table border={1}>
          <th>Nome</th>
          <th>Cognome</th>
          {alunni.map((a) => (
            <Alunno alunno={a} popolaAlunni={popolaAlunni} setAlunno={setAlunno} setInsertForm={setInsertForm} key={a.id} />
          ))}
        </table>
      ) : (
        <div>Loading ...</div>
      )}
      <br />
      {insertForm ? (
        <div>
          <FormDiInserimento popolaAlunni={popolaAlunni} alunno={alunno} setAlunno={setAlunno} />
          <button onClick={noUpdate}>Annulla</button>
        </div>
      ) : (
        <button onClick={() => setInsertForm(true)}>Inserisci alunno</button>
      )}
    </div>
  );
}

export default App;
