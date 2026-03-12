import { useState } from 'react'
import { creaPastoVuoto } from '../data/models'
import { useRecipes } from '../hooks/useRecipes'

const TIPO_PASTO = ['colazione', 'pranzo', 'cena', 'snack']

export default function MealForm({ onSave, dataSelezionata}) {
    const [pasto, setPasto] = useState({ ...creaPastoVuoto(), data: dataSelezionata }) // inizializzo il pasto con un pasto vuoto e la data selezionata
    const [usaRicetta, setUsaRicetta] = useState(false) // stato per sapere se l'utente vuole usare una ricetta esistente
    const { ricette } = useRecipes() // prendo le ricette dal contesto

    const handleCampo = (campo, valore) => {
        setPasto(prev => ({ ...prev, [campo]: valore })) // aggiorno il campo specificato del pasto
    }

    return (
  <div className="flex flex-col gap-4">

    {/* Tipo pasto */}
    <div className="flex gap-2">
      {TIPI_PASTO.map(tipo => (
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