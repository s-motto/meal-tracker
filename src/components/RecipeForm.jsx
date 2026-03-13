
import { creaRicettaVuota } from '../data/models' // Importo la funzione per creare una ricetta vuota
import { useEffect, useState } from 'react'
import { salvaImmagine, caricaImmagine, eliminaImmagine } from '../services/imageStorage'

export default function RecipeForm({ onSave, onError, ricettaIniziale }) { // Componente per il form di creazione/modifica ricetta, riceve la funzione onSave e la ricetta iniziale come props
    const [ricetta, setRicetta] = useState(ricettaIniziale || creaRicettaVuota()) // Inizializzo lo stato con una ricetta vuota
    const [preview, setPreview] = useState(null) // Stato per l'anteprima dell'immagine

    useEffect(() => { // Effetto per caricare l'immagine se la ricetta ha un campo foto
      if(ricettaIniziale?.foto) {
        caricaImmagine(ricettaIniziale.id).then(file => {
          if(file) setPreview(URL.createObjectURL(file)) // Se il file esiste, creo un URL per l'anteprima
        })
      }
    }, [] // L'effetto viene eseguito solo una volta al montaggio del componente
  )
    const handleFoto = (e) => {
      const file = e.target.files[0] // Prendo il primo file selezionato
      if(!file) return // Se non c'è un file, esco dalla funzione
      if(file.size > 2 * 1024 * 1024) return onError?.('L\'immagine deve essere inferiore a 2MB') // Verifico che il file sia inferiore a 2MB, altrimenti mostro un errore
      if(!file.type.startsWith('image/')) return onError?.('Il file deve essere un\'immagine') // Verifico che il file sia un'immagine, altrimenti mostro un errore
      setPreview(URL.createObjectURL(file)) // Creo un URL per l'anteprima dell'immagine
      handleCampo('foto', file.name) // Aggiorno il campo foto della ricetta con il nome del file
      salvaImmagine(ricetta.id, file) // Salvo l'immagine nel database con l'id della ricetta
    }

    const rimuoviFoto = () => {
      setPreview(null) // Rimuovo l'anteprima dell'immagine
      handleCampo('foto', null) // Imposto il campo foto della ricetta a null
      eliminaImmagine(ricetta.id) // Elimino l'immagine dal database
    }

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
        if (!ricetta.nome.trim()) return onError?.('Il nome è obbligatorio') // Verifico che il nome della ricetta non sia vuoto, altrimenti mostro un errore
        onSave(ricetta) // Chiamo la funzione onSave passata come prop con la ricetta da salvare
        setRicetta(creaRicettaVuota()) // Resetto il form a una ricetta vuota dopo il salvataggio
    }

    return (
  <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-6">
    <h1 className="text-2xl">{ricettaIniziale ? 'Modifica ricetta' : 'Nuova ricetta'}</h1>

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

    {/* Foto */}
<div className="flex flex-col gap-2">
  <label className="text-sm text-gray-500">Foto</label>
  {preview ? (
    <div className="relative">
      <img
        src={preview}
        alt="Preview"
        className="w-full h-48 object-cover rounded-xl border border-blush"
      />
      <button
        className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm btn-danger"
        onClick={rimuoviFoto}
      >
        ✕
      </button>
    </div>
  ) : (
    <label className="btn-secondary text-center cursor-pointer">
      + Aggiungi foto
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFoto}
      />
    </label>
  )}
</div>

    <button className="btn-primary w-full" onClick={handleSubmit}>
      Salva ricetta
    </button>
  </div>
)
}