import { useRecipes } from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function RecipeList() {
    const { ricette, elimina } = useRecipes() // Uso il custom hook per ottenere le ricette e la funzione di eliminazione
    const navigate = useNavigate() // Hook per la navigazione
    const [confermaId, setConfermaId] = useState(null) // Stato per gestire la conferma di eliminazione

     const handleElimina = (id) => {
    if (confermaId === id) {
      elimina(id)
      setConfermaId(null)
    } else {
      setConfermaId(id)
      setTimeout(() => setConfermaId(null), 3000)
    }
  }

return (
  <div className="w-full max-w-4xl mx-auto px-4 py-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl">Le mie ricette</h1>
      <button className="btn-primary" onClick={() => navigate('/ricette/nuova')}>
        + Nuova
      </button>
    </div>

    {ricette.length === 0 && (
      <div className="text-center mt-16 flex flex-col items-center gap-2">
        <span className="text-5xl">🍽️</span>
        <p className="text-gray-400">Nessuna ricetta ancora.</p>
        <button className="btn-primary mt-2" onClick={() => navigate('/ricette/nuova')}>
          Crea la tua prima ricetta
        </button>
      </div>
    )}

    <div className="recipe-grid">
      {ricette.map(ricetta => (
        <div key={ricetta.id} className="card flex flex-col gap-3 shadow-sm min-w-0">

          <h2 className="text-xl">{ricetta.nome}</h2>

          {ricetta.calorie && (
            <p className="text-sm text-primary font-medium">{ricetta.calorie} kcal</p>
          )}

          {ricetta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {ricetta.tags.map(tag => (
                <span key={tag} className="bg-blush text-primary text-xs px-3 py-1 rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 mt-auto pt-2 border-t border-blush">
            <button
              className="flex-1 btn-secondary"
              onClick={() => navigate(`/ricette/${ricetta.id}`)}
            >
              Vedi
            </button>
            <button
    className={confermaId === ricetta.id ? 'flex-1 btn-primary' : 'flex-1 btn-danger'}
    onClick={() => handleElimina(ricetta.id)}
  >
    {confermaId === ricetta.id ? 'Sicura?' : 'Elimina'}
  </button>
          </div>

        </div>
      ))}
    </div>
  </div>
)
}