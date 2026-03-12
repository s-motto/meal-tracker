import { useState } from 'react'
import { carica, salva } from '../data/store'

const CHIAVE = 'pasti'

export function useMeals() {
  const [pasti, setPasti] = useState(() => carica(CHIAVE)) // inizializzo lo stato dei pasti caricando i dati dal localStorage

  const aggiungi = (pasto) => { // funzione per aggiungere un pasto
    const nuovi = [...pasti, pasto]
    setPasti(nuovi)
    salva(CHIAVE, nuovi)
  }

  const aggiorna = (pastoModificato) => { // funzione per aggiornare un pasto esistente
    const nuovi = pasti.map(p => p.id === pastoModificato.id ? pastoModificato : p)
    setPasti(nuovi)
    salva(CHIAVE, nuovi)
  }

  const elimina = (id) => { // funzione per eliminare un pasto in base al suo id
    const nuovi = pasti.filter(p => p.id !== id)
    setPasti(nuovi)
    salva(CHIAVE, nuovi)
  }

  const getMealByDate = (data) => { // funzione per ottenere i pasti di una specifica data
    return pasti.filter(p => p.data === data)
  }

  return { pasti, aggiungi, aggiorna, elimina, getMealByDate }
}