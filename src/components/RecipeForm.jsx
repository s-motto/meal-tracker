import {useState} from 'react'
import { creaRicettaVuota } from '../data/models' // Importo la funzione per creare una ricetta vuota

export default function RecipeForm({ onSave}) {
    const [ricetta, setRicetta] = useState(creaRicettaVuota()) // Inizializzo lo stato con una ricetta vuota

    const handleCampo = (campo, valore) => {
        setRicetta(prev => ({ ...prev, [campo]: valore })) // Aggiorno il campo specificato nella ricetta
    }

    const handleIngrediente = (index, campo, valore) => {
        const nuovi = [...ricetta.ingredienti] // Creo una copia dell'array degli ingredienti
        nuovi[index][campo] = valore // Aggiorno il campo specifico dell'ingrediente
        setRicetta(prev => ({ ...prev, ingredienti: nuovi })) // Aggiorno lo stato con i nuovi ingredienti
    }   

    const aggiungiIngrediente = () => {
        setRicetta(prev => ({ ...prev, ingredienti: [...prev.ingredienti, { nome: '', quantita: '' }] })) // Aggiungo un nuovo ingrediente vuoto alla ricetta
    }

    const rimuoviIngrediente = (index) => {
        if (ricetta.ingredienti.length === 1) return // Non permetto di rimuovere l'ultimo ingrediente
        const nuovi=ricetta.ingredienti.filter((_, i) => i !== index) // Rimuovo l'ingrediente all'indice specificato
        setRicetta(prev => ({ ...prev, ingredienti: nuovi })) // Aggiorno lo stato con i nuovi ingredienti
    }

    const handleSubmit = () => {
        if (!ricetta.nome.trim()) return alert('Il nome della ricetta è obbligatorio') // Verifico che il nome della ricetta non sia vuoto
        onSave(ricetta) // Chiamo la funzione onSave passata come prop con la ricetta da salvare
        setRicetta(creaRicettaVuota()) // Resetto il form a una ricetta vuota dopo il salvataggio
    }

    return (
  <div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
    <h1 className="text-2xl">Nuova ricetta</h1>

    {/* Nome */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">Nome ricetta</label>
      <input
        className="input-base"
        placeholder="es. Pasta al pomodoro"
        value={ricetta.nome}
        onChange={e => handleCampo('nome', e.target.value)}
      />
    </div>

    {/* Ingredienti */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-500">Ingredienti</label>
      {ricetta.ingredienti.map((ing, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="input-base"
            placeholder="Ingrediente"
            value={ing.nome}
            onChange={e => handleIngrediente(index, 'nome', e.target.value)}
          />
          <input
            className="input-base w-28"
            placeholder="Quantità"
            value={ing.quantita}
            onChange={e => handleIngrediente(index, 'quantita', e.target.value)}
          />
          <button
            className="btn-danger px-3"
            onClick={() => rimuoviIngrediente(index)}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="self-start text-sm text-primary hover:text-primary-light transition-colors"
        onClick={aggiungiIngrediente}
      >
        + Aggiungi ingrediente
      </button>
    </div>

    {/* Istruzioni */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">Istruzioni</label>
      <textarea
        className="input-base h-32 resize-none"
        placeholder="Descrivi i passaggi..."
        value={ricetta.istruzioni}
        onChange={e => handleCampo('istruzioni', e.target.value)}
      />
    </div>

    {/* Calorie */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">Calorie (kcal)</label>
      <input
        className="input-base"
        type="number"
        placeholder="es. 450"
        value={ricetta.calorie}
        onChange={e => handleCampo('calorie', e.target.value)}
      />
    </div>

    {/* Tags */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-500">Tags</label>
      <div className="flex flex-wrap gap-2">
        {['vegetariano', 'vegano', 'veloce', 'dolce', 'senza glutine'].map(tag => (
          <button
            key={tag}
            onClick={() => {
              const nuovi = ricetta.tags.includes(tag)
                ? ricetta.tags.filter(t => t !== tag)
                : [...ricetta.tags, tag]
              handleCampo('tags', nuovi)
            }}
            className={`px-3 py-1 rounded-full text-sm border transition-colors
              ${ricetta.tags.includes(tag)
                ? 'bg-primary text-white border-primary'
                : 'border-blush hover:border-primary-light hover:text-primary'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

    <button className="btn-primary w-full" onClick={handleSubmit}>
      Salva ricetta
    </button>
  </div>
)
}