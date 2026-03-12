import { useRecipes } from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'

export default function RecipeList() {
    const { ricette, elimina } = useRecipes() // Uso il custom hook per ottenere le ricette e la funzione di eliminazione
    const navigate = useNavigate() // Hook per la navigazione

    return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Le mie ricette</h1>
      <button
        className="btn-primary"
        onClick={() => navigate('/ricette/nuova')}
      >
        + Nuova
      </button>
    </div>

    {ricette.length === 0 && (
      <p className="text-gray-400 text-center mt-16">
        Nessuna ricetta ancora. Creane una!
      </p>
    )}

    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {ricette.map(ricetta => (
        <div key={ricetta.id} className="card flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{ricetta.nome}</h2>

          {ricetta.calorie && (
            <p className="text-sm text-gray-500">{ricetta.calorie} kcal</p>
          )}

          <div className="flex flex-wrap gap-1">
            {ricetta.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-auto">
            <button
              className="btn-secondary flex-1"
              onClick={() => navigate(`/ricette/${ricetta.id}`)}
            >
              Vedi
            </button>
            <button
              className="btn-danger flex-1"
              onClick={() => elimina(ricetta.id)}
            >
              Elimina
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}