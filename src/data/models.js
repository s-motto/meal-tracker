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
    dataCreazione: new Date().toISOString().split('T')[0] // Aggiungo la data di creazione in formato YYYY-MM-DD
  }
}