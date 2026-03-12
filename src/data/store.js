export function carica(chiave) {
  const dati = localStorage.getItem(chiave)
  return dati ? JSON.parse(dati) : []
}

export function salva(chiave, dati) {
  localStorage.setItem(chiave, JSON.stringify(dati))
}