import { useState } from 'react'
import { useMeals } from '../hooks/useMeals'
import { useRecipes } from '../hooks/useRecipes'
import MealForm from '../components/MealForm'

function dataOggi() {
    return new Date().toISOString().split('T')[0]; // restituisce la data odierna in formato YYYY-MM-DD
}

function formatData(data) {
    return new Date(data).toLocaleDateString('it-IT',{ // formatto la data in modo leggibile in italiano    
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'

    
    })
}

export default function MealLog() {
    const [dataSelezionata, setDataSelezionata] = useState(dataOggi()) // stato per la data selezionata, inizializzata con la data odierna
    const [mostraForm, setMostraForm] = useState(false) // stato per mostrare o nascondere il form
    const {aggiungi, elimina, getMealByDate} = useMeals() // prendo le funzioni per aggiungere, eliminare e ottenere pasti per data dal contesto
    const {ricette} = useRecipes() // prendo le ricette dal contesto

    const pastiDelGiorno = getMealByDate(dataSelezionata) // ottengo i pasti per la data selezionata

    const totaleCalorie = pastiDelGiorno.reduce((acc, pasto) => {
        return acc + (Number(pasto.calorie) || 0)
    }, 0) // calcolo il totale delle calorie dei pasti del giorno

    const cambiaGiorno = (direzione) => {
        const data = new Date(dataSelezionata)
        data.setDate(data.getDate() + direzione) // cambio la data aggiungendo o sottraendo un giorno
        setDataSelezionata(data.toISOString().split('T')[0]) // aggiorno lo stato con la nuova data in formato YYYY-MM-DD
    }

    const handleSave = (pasto) => {
        aggiungi(pasto) // aggiungo il pasto al contesto
        setMostraForm(false) // nascondo il form
    }

    const getNomeRicetta = (ricettaId) => {
        return ricette.find(r => r.id === ricettaId)?.nome || 'Pasto libero' // restituisco il nome della ricetta se c'è, altrimenti "Pasto libero"
    }

    return (
    <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-6">

      {/* Navigazione giorno */}
      <div className="flex justify-between items-center">
        <button className="btn-secondary" onClick={() => cambiaGiorno(-1)}>
          ←
        </button>
        <div className="text-center">
          <p className="font-semibold capitalize">
            {formatData(dataSelezionata)}
          </p>
          {dataSelezionata !== dataOggi() && (
            <button
              className="text-xs text-primary hover:underline mt-1"
              onClick={() => setDataSelezionata(dataOggi())}
            >
              Torna ad oggi
            </button>
          )}
        </div>
        <button className="btn-secondary" onClick={() => cambiaGiorno(1)}>
          →
        </button>
      </div>

      {/* Sommario calorie */}
      <div className="card bg-white border-blush shadow-sm text-center">
  <p className="text-sm text-gray-500">Calorie totali</p>
  <p className="text-3xl font-semibold text-primary">{totaleCalorie}</p>
  <p className="text-sm text-gray-400">kcal</p>
</div>

      {/* Lista pasti */}
      <div className="flex flex-col gap-3">
        {pastiDelGiorno.length === 0 && (
          <p className="text-gray-400 text-center mt-4">
            Nessun pasto registrato per oggi.
          </p>
        )}
        {pastiDelGiorno.map(pasto => (
          <div key={pasto.id} className="card flex justify-between items-center">
            <div>
              <span className="text-xs text-green-600 font-medium capitalize">
                {pasto.tipo}
              </span>
              <p className="font-medium">{pasto.descrizione}</p>
              {pasto.calorie && (
                <p className="text-sm text-gray-400">{pasto.calorie} kcal</p>
              )}
            </div>
            <button
              className="btn-danger"
              onClick={() => elimina(pasto.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Form aggiunta pasto */}
      {mostraForm ? (
        <div className="card">
          <MealForm onSave={handleSave} dataSelezionata={dataSelezionata} />
          <button
            className="btn-secondary w-full mt-3"
            onClick={() => setMostraForm(false)}
          >
            Annulla
          </button>
        </div>
      ) : (
        <button
          className="btn-primary w-full"
          onClick={() => setMostraForm(true)}
        >
          + Aggiungi pasto
        </button>
      )}

    </div>
  )

}