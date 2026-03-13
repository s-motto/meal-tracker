import { v4 as uuidv4 } from 'uuid' // Importo la funzione per generare ID unici

// Funzione per creare una ricetta vuota
export function creaRicettaVuota() {
  return {
    id: uuidv4(), // Genero un ID unico per la ricetta
    nome: '',
    ingredienti: [{ nome: '', quantita: '' }], 
    istruzioni: '',
    calorie: '',
    tags: [],
    foto: null, // Campo per l'immagine, inizialmente null
    dataCreazione: new Date().toISOString().split('T')[0] // Aggiungo la data di creazione in formato YYYY-MM-DD
  }
}

// Funzione per creare un pasto vuoto
export function creaPastoVuoto() {
  return {
    id: uuidv4(), // Genero un ID unico per il pasto
    data: new Date().toISOString().split('T')[0], // Imposto la data di default a oggi in formato YYYY-MM-DD
    tipo: 'pranzo', // Imposto il tipo di pasto di default a "pranzo"
    ricettaId: null, // Se è un pasto libero, ricettaId sarà null 
    descrizione: '', // Per i pasti liberi, l'utente può inserire una descrizione
    calorie: '', // Per i pasti liberi, l'utente può inserire le calorie
    foto: null // Campo per l'immagine, inizialmente null
  }
}