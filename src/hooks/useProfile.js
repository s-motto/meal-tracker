import { useState } from 'react'
import { carica, salva } from '../data/store'

const CHIAVE_PROFILO = 'profilo'
const CHIAVE_MISURAZIONI = 'misurazioni'

const PROFILO_VUOTO = {
  nome: '',
  dataNascita: '',
  peso: '',
  altezza: ''
}

export function useProfile() { // hook personalizzato per gestire il profilo utente e le misurazioni
  const [profilo, setProfilo] = useState(() => carica(CHIAVE_PROFILO) || PROFILO_VUOTO) // inizializzo lo stato del profilo caricando i dati dal localStorage o usando un profilo vuoto
  const [misurazioni, setMisurazioni] = useState(() => carica(CHIAVE_MISURAZIONI) || []) // stato per le misurazioni, inizializzato con i dati dal localStorage o un array vuoto

  const aggiornaProfilo = (nuovoProfilo) => { // funzione per aggiornare il profilo utente
    setProfilo(nuovoProfilo)
    salva(CHIAVE_PROFILO, nuovoProfilo)
  }

  const aggiungiMisurazione = (misurazione) => { // funzione per aggiungere una nuova misurazione
    const nuove = [...misurazioni, misurazione].sort((a, b) => a.data.localeCompare(b.data))
    setMisurazioni(nuove)
    salva(CHIAVE_MISURAZIONI, nuove)
  }

  const eliminaMisurazione = (id) => { // funzione per eliminare una misurazione in base al suo id
    const nuove = misurazioni.filter(m => m.id !== id)
    setMisurazioni(nuove)
    salva(CHIAVE_MISURAZIONI, nuove)
  }

  const calcolaEta = () => { // funzione per calcolare l'età dell'utente in base alla data di nascita
    if (!profilo.dataNascita) return null
    const oggi = new Date()
    const nascita = new Date(profilo.dataNascita)
    let eta = oggi.getFullYear() - nascita.getFullYear()
    const mese = oggi.getMonth() - nascita.getMonth()
    if (mese < 0 || (mese === 0 && oggi.getDate() < nascita.getDate())) eta--
    return eta
  }

  return { profilo, misurazioni, aggiornaProfilo, aggiungiMisurazione, eliminaMisurazione, calcolaEta }
}