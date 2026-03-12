import { useState } from 'react'
import { carica, salva } from '../data/store'

const CHIAVE = 'ricette'

export function useRecipes() {
  const [ricette, setRicette] = useState(() => carica(CHIAVE))

  const aggiungi = (ricetta) => {
    const nuove = [...ricette, ricetta]
    setRicette(nuove)
    salva(CHIAVE, nuove)
  }

  const elimina = (id) => {
    const nuove = ricette.filter(r => r.id !== id)
    setRicette(nuove)
    salva(CHIAVE, nuove)
  }

  const aggiorna = (ricettaModificata) => {
    const nuove = ricette.map(r => r.id === ricettaModificata.id ? ricettaModificata : r)
    setRicette(nuove)
    salva(CHIAVE, nuove)
  }

  return { ricette, aggiungi, elimina, aggiorna }
}