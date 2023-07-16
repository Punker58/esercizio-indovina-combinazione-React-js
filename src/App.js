import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  // lista passaggi
  const [lista, setLista] = useState([
    { id: "1", nome: "Aggiungi l’acqua nella caldaia" },
    { id: "2", nome: "Aggiungi la miscela di caffè nel filtro a imbuto" },
    { id: "3", nome: "Inserisci il filtro nel bollitore" },
    { id: "4", nome: "Avvita il bricco sulla parte superiore stringendo bene" },
    {
      id: "5",
      nome:
        "Metti la moka sulla fonte di calore e regola la temperatura al massimo"
    },
    {
      id: "6",
      nome: "Spegni il fuoco quando l’espresso smette di fuoriuscire dal camino"
    },
    { id: "7", nome: "Incartare la macchinetta con un giornale" },
    { id: "8", nome: "Accendere il computer" },
    { id: "9", nome: "Tenere la moka al sole finchè non sale il caffè" }
  ]);

  /* 
    lista front end (per visualizzare a schermo i passaggi scelti)
    lista back end (per lavorare all'inserimento dei passaggi scelti) 
  */
  const lista2 = [];
  const lista3 = useRef([]);

  // lista con ordine giusto
  const ordineGiusto = ["1", "2", "3", "4", "5", "6"];

  // dichiaro i state delle checkbox e le disabilito al suo click
  const [seleziona, setSeleziona] = useState([]);
  const [selezionaSteps, setSelezionaSteps] = useState([]);

  // tasto checkbox
  const handleOrdine = (id, nome) => {
    lista2.push(nome + " ");
    lista3.current.push(id);
    setSeleziona((current) => [...current, lista2]);
    setSelezionaSteps([...selezionaSteps, id]);
  };

  // tasto conferma
  const handleConferma = () => {
    if (JSON.stringify(lista3.current) === JSON.stringify(ordineGiusto)) {
      window.alert("Hai vinto!");
    } else {
      window.alert("Hai perso!");
    }

    window.location.reload();
  };

  // tasto reset
  const handleReset = () => {
    window.location.reload();
  };

  // creo la lista con il metodo .map e gli assegno dei valori
  useEffect(() => {
    /* 
      renderizzo la lista aggiungendo un metodo math random
      che mi permette di randomizzare le posizioni
    */
    const rand = [...lista].sort(() => Math.random() - 0.5);
    setLista(rand);
  }, []);

  return (
    <div className="main">
      <h1>Prepara un caffè</h1>
      {lista.map((e) => (
        <div key={e.id} className="box">
          <p>{e.nome}</p>
          <input
            id={e.id}
            type="checkbox"
            className="check58"
            value={e.id}
            onClick={() => handleOrdine(e.id, e.nome)}
            disabled={selezionaSteps.includes(e.id)}
          />
        </div>
      ))}

      <p>Procedura: </p>
      {seleziona.map((e) => (
        <div key={e} className="box">
          <p>{e}</p>
        </div>
      ))}
      <button style={{ marginRight: "20px" }} onClick={() => handleReset()}>
        RESET
      </button>
      <button onClick={() => handleConferma()}>CONFERMA</button>
    </div>
  );
}
