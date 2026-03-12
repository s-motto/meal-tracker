import { useState } from 'react'
import { creaPastoVuoto } from '../data/models'
import { useRecipes } from '../hooks/useRecipes'

const TIPO_PASTO = ['colazione', 'pranzo', 'cena', 'snack'] // Array con i tipi di pasto disponibili

export default function MealForm({ onSave, onError, dataSelezionata }) { // Componente per il form di aggiunta pasto, riceve la funzione onSave e la data selezionata come props
  const [pasto, setPasto] = useState({ ...creaPastoVuoto(), data: dataSelezionata })
  const [usaRicetta, setUsaRicetta] = useState(false)
  const { ricette } = useRecipes()

  const handleCampo = (campo, valore) => { // Funzione per aggiornare i campi del pasto
    setPasto(prev => ({ ...prev, [campo]: valore }))
  }

  const handleRicetta = (ricettaId) => { // Funzione per gestire la selezione di una ricetta dal catalogo
    const ricetta = ricette.find(r => r.id === ricettaId)
    setPasto(prev => ({
      ...prev,
      ricettaId: ricetta.id,
      descrizione: ricetta.nome,
      calorie: ricetta.calorie
    }))
  }

  const handleSubmit = () => { // Funzione per gestire il salvataggio del pasto
    if (!pasto.descrizione.trim()) return onError('La descrizione è obbligatoria')
    onSave(pasto)
    setPasto({ ...creaPastoVuoto(), data: dataSelezionata })
    setUsaRicetta(false)
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Tipo pasto */}
      <div className="flex gap-2">
        {TIPO_PASTO.map(tipo => (
          <button
            key={tipo}
            className={pasto.tipo === tipo ? 'btn-tipo-attivo' : 'btn-tipo'}
            onClick={() => handleCampo('tipo', tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Switch ricetta / pasto libero */}
      <div className="flex gap-2">
        <button
          className={!usaRicetta ? 'btn-switch-attivo' : 'btn-switch'}
          onClick={() => setUsaRicetta(false)}
        >
          Pasto libero
        </button>
        <button
          className={usaRicetta ? 'btn-switch-attivo' : 'btn-switch'}
          onClick={() => setUsaRicetta(true)}
        >
          Dal catalogo
        </button>
      </div>

      {/* Campi dinamici */}
      {usaRicetta ? (
        <select
          className="input-base"
          value={pasto.ricettaId || ''}
          onChange={e => handleRicetta(e.target.value)}
        >
          <option value="">Scegli una ricetta...</option>
          {ricette.map(r => (
            <option key={r.id} value={r.id}>{r.nome}</option>
          ))}
        </select>
      ) : (
        <>
          <input
            className="input-base"
            placeholder="Descrizione (es. Caffè, Pranzo fuori...)"
            value={pasto.descrizione}
            onChange={e => handleCampo('descrizione', e.target.value)}
          />
          <input
            className="input-base"
            type="number"
            placeholder="Calorie (kcal)"
            value={pasto.calorie}
            onChange={e => handleCampo('calorie', e.target.value)}
          />
        </>
      )}

      <button className="btn-primary w-full" onClick={handleSubmit}>
        Aggiungi pasto
      </button>

    </div>
  )
}