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
  <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-6">

    {/* Header */}
<div className="flex justify-between items-start">
  <div>
    <h1 className="text-3xl">{ricetta.nome}</h1>
    {ricetta.calorie && (
      <p className="text-sm text-gray-500 mt-1">{ricetta.calorie} kcal per porzione</p>
    )}
  </div>
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

   


    {/* Ingredienti */}
    <div className="card shadow-sm">
      <h2 className="font-medium mb-3">Ingredienti</h2>
      <ul className="flex flex-col divide-y divide-blush">
        {ricetta.ingredienti.map((ing, index) => (
          <li key={index} className="flex justify-between py-2">
            <span>{ing.nome}</span>
            <span className="text-primary font-medium">{ing.quantita}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Istruzioni */}
    {ricetta.istruzioni && (
      <div className="card shadow-sm">
        <h2 className="font-medium mb-3">Istruzioni</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {ricetta.istruzioni}
        </p>
      </div>
    )}

    <button
      className="btn-secondary self-start"
      onClick={() => navigate('/ricette')}
    >
      ← Torna alle ricette
    </button>

  </div>
)

}