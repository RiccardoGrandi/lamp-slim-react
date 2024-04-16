import './App.css';
import Alunno from './Alunno';
import {useState, useEF, useEffect} from 'react';

function App() {

  useEffect(() => {
    popolaAlunni();
  }, [])

  const [alunni, setAlunni] = useState([]);
  const [pronto, setPronto] = useState(false);

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
          alunni.map(a => (
            <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
          ))
        :
          <div>Loading ...</div>
      }
    </div>
  );
}

export default App;