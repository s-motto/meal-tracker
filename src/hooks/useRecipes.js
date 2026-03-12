import {useState} from 'react';

const CHIAVE = 'ricette'; // Chiave per localStorage

function caricaDaStorage() {
    const dati = localStorage.getItem(CHIAVE);
    return dati ? JSON.parse(dati) : []; // Restituisco un array vuoto se non ci sono dati
}

function salvaSuStorage(ricette) {
    localStorage.setItem(CHIAVE, JSON.stringify(ricette)); // Salvo le ricette come stringa JSON
}

export function useRecipes() {
    const [ricette, setRicette] = useState(caricaDaStorage); // Inizializzo lo stato con le ricette caricate da localStorage

    const aggiungi = (ricetta) => {
        const nuove = [...ricette, ricetta]; // Creo un nuovo array con la nuova ricetta aggiunta
        setRicette(nuove);
        salvaSuStorage(nuove); // Salvo le ricette aggiornate su localStorage
    }

    const elimina = (id) => {
        const nuove = ricette.filter(r => r.id !== id); // Creo un nuovo array senza la ricetta con l'id specificato
        setRicette(nuove);
        salvaSuStorage(nuove); // Salvo le ricette aggiornate su localStorage
    }

    const aggiorna = (ricettaModificata) => {
        const nuove = ricette.map(r => r.id === ricettaModificata.id ? ricettaModificata : r); // Creo un nuovo array sostituendo la ricetta modificata
        setRicette(nuove);
        salvaSuStorage(nuove); // Salvo le ricette aggiornate su localStorage
    }

    return { ricette, aggiungi, elimina, aggiorna }; // Ritorno le ricette e le funzioni per gestirle
}