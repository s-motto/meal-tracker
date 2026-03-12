import {useState} from 'react';

const CHIAVE = 'pasti';


function caricaDaStorage(){
  const dati = localStorage.getItem(CHIAVE); // null se non c'è nulla
  return dati ? JSON.parse(dati) : []; // se c'è qualcosa, lo converto da stringa a array, altrimenti restituisco un array vuoto
}

function salvaSuStorage(pasti){
  localStorage.setItem(CHIAVE, JSON.stringify(pasti)); // converto l'array in stringa e lo salvo su localStorage
}

export function useMeals() {
  const [pasti, setPasti] = useState(caricaDaStorage) // carico i pasti dallo storage quando il componente viene montato

  const aggiungi = (pasto) => {
    const nuovi = [...pasti, pasto]
    setPasti(nuovi);
    salvaSuStorage(nuovi);
    }

    const aggiorna = (pastoModificato) => {
  const nuovi = pasti.map(p => p.id === pastoModificato.id ? pastoModificato : p)
      setPasti(nuovi);
      salvaSuStorage(nuovi);
    }

const elimina = (id) => {
  const nuovi = pasti.filter(p => p.id !== id);
  setPasti(nuovi);
  salvaSuStorage(nuovi);
}

const getMealByDate = (data) => {
  return pasti.filter(p => p.data === data); // restituisce un array di pasti che hanno la data specificata
}

    return { pasti, aggiungi, aggiorna, elimina, getMealByDate }
}


