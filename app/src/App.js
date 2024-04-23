import './App.css';
import Alunno from './Alunno';
import {useState, useEffect} from 'react';
import FormDiInserimento from './FormDiIserimento';

function App() {

  useEffect(() => {
    popolaAlunni();
  }, [])

  const [alunni, setAlunni] = useState([]);
  const [pronto, setPronto] = useState(false);
  const [insertForm, setInsertForm] = useState(false);

  async function popolaAlunni() {
    const response = await fetch("http://localhost:8080/alunni", {method: "GET"});
    const array = await response.json();
    setAlunni(array);
    setPronto(true);
  }

  return (
    <div className="App">
      {
        pronto ?
          <table>
            <th>Nome</th>
            <th>Cognome</th>
            {
              alunni.map(a => (
                <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
              ))
            }
          </table>
        :
          <div>Loading ...</div>
      }
      <br />
      {
        insertForm ?
          <div>
            <FormDiInserimento popolaAlunni={popolaAlunni} />
            <button onClick={() => setInsertForm(false)}>Annulla</button>
          </div>
        : 
          <button onClick={() => setInsertForm(true)}>Inserisci alunno</button>
      }
    </div>
  );
}

export default App;