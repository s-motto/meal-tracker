const DB_NAME = 'meal-tracker'
const DB_VERSION = 1
const STORE_NAME = 'immagini'


function apriDB() { // apre o crea il database IndexedDB
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (e) => { // se il database è nuovo o ha una versione più vecchia, crea lo store
       e.target.result.createObjectStore(STORE_NAME)
    }

    request.onsuccess = (e) => resolve(e.target.result) // risolve la promise con il database aperto
    request.onerror = (e) => reject(e.target.error) // rifiuta la promise in caso di errore
  })
}

export async function salvaImmagine(id, file) { // salva un file immagine con un id specifico
  const db = await apriDB()
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite') // avvia una transazione in modalità scrittura
        tx.objectStore(STORE_NAME).put(file, id) // salva il file con la chiave id nello store
        tx.oncomplete = () => resolve() // risolve la promise quando la transazione è completata
        tx.onerror = (e) => reject(e.target.error) // rifiuta la promise in caso di errore
    })
}

export async function caricaImmagine(id) { // carica un file immagine con un id specifico
  const db = await apriDB()
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly') // avvia una transazione in modalità lettura
        const request = tx.objectStore(STORE_NAME).get(id) // richiede il file con la chiave id dallo store
        request.onsuccess = (e) => resolve(e.target.result) // risolve la promise con il file ottenuto
        request.onerror = (e) => reject(e.target.error) // rifiuta la promise in caso di errore
    })
}

export async function eliminaImmagine(id) { // elimina un file immagine con un id specifico
  const db = await apriDB()
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite') // avvia una transazione in modalità scrittura
        tx.objectStore(STORE_NAME).delete(id) // elimina il file con la chiave id dallo store
        tx.oncomplete = () => resolve() // risolve la promise quando la transazione è completata
        tx.onerror = (e) => reject(e.target.error) // rifiuta la promise in caso di errore
    })
}