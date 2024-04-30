import { useState } from "react";

export default function FormDiInserimento({ popolaAlunni, alunno, setAlunno }) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  async function salvaAlunno() {
    await fetch(`http://localhost:8080/alunni`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    popolaAlunni();
  }

  async function edit() {
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    setAlunno(null);
    popolaAlunni();
  }

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }

  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  return (
    <div>
      {alunno !== null ? (
        <>
          <h1>Form di Aggiornamento</h1>
          <div>
            Nome: <input type="text" onChange={gestisciCambioNome} />
          </div>
          <div>
            Cognome: <input type="text" onChange={gestisciCambioCognome} />
          </div>
          <div>
            <button onClick={edit}>Salva</button>
          </div>
        </>
      ) : (
        <>
          <h1>Form di inserimento</h1>
          <div>
            Nome: <input type="text" onChange={gestisciCambioNome} />
          </div>
          <div>
            Cognome: <input type="text" onChange={gestisciCambioCognome} />
          </div>
          <div>
            <button onClick={salvaAlunno}>Salva</button>
          </div>
        </>
      )}
    </div>
  );
}
