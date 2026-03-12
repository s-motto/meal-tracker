import { useRecipes } from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'

export default function RecipeList() {
    const { ricette, elimina } = useRecipes() // Uso il custom hook per ottenere le ricette e la funzione di eliminazione
    const navigate = useNavigate() // Hook per la navigazione

    return (
        <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Le mie ricette</h1>
        <button onClick={() => navigate('/ricette/nuova')}>+ Nuova</button>
      </div>

      {ricette.length === 0 && (
        <p>Nessuna ricetta ancora. Creane una!</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {ricette.map(ricetta => (
          <div key={ricetta.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h2>{ricetta.nome}</h2>

            {ricetta.calorie && (
              <p>{ricetta.calorie} kcal</p>
            )}

            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
              {ricetta.tags.map(tag => (
                <span key={tag} style={{ background: '#eee', padding: '2px 8px', borderRadius: 99 }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => navigate(`/ricette/${ricetta.id}`)}>Vedi</button>
              <button onClick={() => elimina(ricetta.id)}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}