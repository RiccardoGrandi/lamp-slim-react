import { useState } from "react";

export default function Alunno({ alunno, popolaAlunni, setAlunno, setInsertForm }) {
  const [inCancellazione, setInCancellazione] = useState(false);
  const [richiestaConferma, setRichiestaConferma] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(alunno.nome);
  const [cognome, setCognome] = useState(alunno.cognome);

  async function cancellaAlunno() {
    setRichiestaConferma(false);
    setInCancellazione(true);
    const response = await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "DELETE",
    });
    popolaAlunni();
  }

  function richiesta() {
    setRichiestaConferma(true);
  }

  function annulla() {
    setRichiestaConferma(false);
  }

  function avviaEditing() {
    setEditing(true);
  }

  function annullaEditing() {
    setEditing(false);
  }

  async function fineEditing() {
    setEditing(false);

    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });

    popolaAlunni();
  }

  function changeNome(event) {
    setNome(event.target.value);
  }

  function changeCognome(event) {
    setCognome(event.target.value);
  }

  function avviaEditing2() {
    setAlunno(alunno);
    setInsertForm(true);
  }

  return (
    <tr>
      <td>
        {editing ? (
          <input type="text" onChange={changeNome} value={nome} />
        ) : (
          alunno.nome
        )}
      </td>
      <td>
        {editing ? (
          <input type="text" onChange={changeCognome} value={cognome} />
        ) : (
          alunno.cognome
        )}
      </td>
      <td>
        {editing ? (
          <span>
            <button onClick={fineEditing}>Salva</button>
            <button onClick={annullaEditing}>Annulla</button>
          </span>
        ) : (
          <>
            <button onClick={avviaEditing}>Edit</button>
            <button onClick={avviaEditing2}>Edit2</button>
            {richiestaConferma ? (
              <span>
                {" "}
                Sei sicuro?
                <button onClick={cancellaAlunno}>si</button>
                <button onClick={annulla}>no</button>
              </span>
            ) : (
              <button onClick={richiesta}>Cancella</button>
            )}
            {inCancellazione && <span>in fase di cancellazione...</span>}
          </>
        )}
      </td>
    </tr>
  );
}
