import { useState } from 'react'
import { useMeals } from '../hooks/useMeals'
import MealForm from '../components/MealForm'
import Toast from '../components/Toast'

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
    const [toast, setToast] = useState('') // stato per il messaggio del toast
    const [toastId, setToastId] = useState(0) // stato per forzare il ri-render del toast quando il messaggio cambia
    const [confermaId, setConfermaId] = useState(null) // stato per gestire la conferma di eliminazione del pasto

    const mostraToast = (msg) => {
      setToast(msg)
      setToastId(id => id + 1)
    }

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
        aggiungi(pasto) // aggiungo il pasto usando la funzione del contesto
        setMostraForm(false) // nascondo il form dopo il salvataggio
        mostraToast('Pasto aggiunto con successo!')
      }

    const handleElimina = (id) => {
  if (confermaId === id) {
    elimina(id)
    setConfermaId(null)
    mostraToast('Pasto eliminato')
  } else {
    setConfermaId(id)
    setTimeout(() => setConfermaId(null), 3000)
  }
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
  className={confermaId === pasto.id ? 'btn-primary' : 'btn-danger'}
  onClick={() => handleElimina(pasto.id)}
>
  {confermaId === pasto.id ? 'Sicura?' : '✕'}
</button>
          </div>
        ))}
      </div>

      {/* Sommario calorie */}
     <div className="card shadow-sm">
  <p className="text-sm text-gray-500">Calorie totali: <span className="text-gray-700 font-medium">{totaleCalorie} kcal</span></p>
</div>

      {/* Form aggiunta pasto */}
      {mostraForm ? (
        <div className="card">
          <MealForm
             onSave={handleSave}
             onError={mostraToast}
              dataSelezionata={dataSelezionata}
          />
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
      <Toast key={toastId} messaggio={toast} onClose={() => setToast('')} />

    </div>
  )

}