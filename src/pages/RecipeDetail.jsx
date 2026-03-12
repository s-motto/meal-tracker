import { useParams, useNavigate } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'

export default function RecipeDetail() {
    const { id } = useParams() // Ottengo l'id della ricetta dai parametri dell'URL
    const { ricette, elimina } = useRecipes() // Uso il custom hook per ottenere le ricette e la funzione di eliminazione
    const navigate = useNavigate() // Hook per la navigazione
    const ricetta = ricette.find(r => r.id === id) // Trovo la ricetta corrispondente all'id

    if (!ricetta) return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <p className="text-gray-400">Ricetta non trovata.</p>
      <button className="btn-secondary mt-4" onClick={() => navigate('/ricette')}>
        Torna alle ricette
      </button>
    </div>
  )

   const handleElimina = () => {
    if (window.confirm('Sei sicuro di voler eliminare questa ricetta?')) {
      elimina(ricetta.id) // Elimino la ricetta usando la funzione del custom hook
      navigate('/ricette') // Torno alla lista delle ricette dopo l'eliminazione
    }
}

   
    return (
    <div className="max-w-xl mx-auto p-6 flex flex-col gap-6">

      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold">{ricetta.nome}</h1>
        <div className="flex gap-2">
          <button
            className="btn-secondary"
            onClick={() => navigate(`/ricette/${ricetta.id}/modifica`)}
          >
            Modifica
          </button>
          <button className="btn-danger" onClick={handleElimina}>
            Elimina
          </button>
        </div>
      </div>

      {ricetta.calorie && (
        <p className="text-gray-500">{ricetta.calorie} kcal</p>
      )}

      {ricetta.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {ricetta.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <h2 className="font-medium mb-2">Ingredienti</h2>
        <ul className="flex flex-col gap-1">
          {ricetta.ingredienti.map((ing, index) => (
            <li key={index} className="flex justify-between border-b border-gray-100 py-1">
              <span>{ing.nome}</span>
              <span className="text-gray-500">{ing.quantita}</span>
            </li>
          ))}
        </ul>
      </div>

      {ricetta.istruzioni && (
        <div>
          <h2 className="font-medium mb-2">Istruzioni</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {ricetta.istruzioni}
          </p>
        </div>
      )}

      <button className="btn-secondary self-start" onClick={() => navigate('/ricette')}>
        ← Torna alle ricette
      </button>

    </div>
  )

}