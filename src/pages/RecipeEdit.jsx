import { useParams, useNavigate } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import RecipeForm from '../components/RecipeForm'
import { useState } from 'react'
import Toast from '../components/Toast'

export default function RecipeEdit() { // Pagina per modificare una ricetta esistente
  const { id } = useParams()
  const { ricette, aggiorna } = useRecipes()
  const navigate = useNavigate()
  const [toast, setToast] = useState('') // Stato per gestire i messaggi di errore nel form

  const ricetta = ricette.find(r => r.id === id) // Trovo la ricetta da modificare in base all'id passato come parametro nell'URL

  if (!ricetta) return (
    <div className="max-w-xl mx-auto px-4 py-6 text-center">
      <p className="text-gray-400">Ricetta non trovata.</p>
      <button className="btn-secondary mt-4" onClick={() => navigate('/ricette')}>
        Torna alle ricette
      </button>
    </div>
  )

  const handleSave = (ricettaModificata) => { // Funzione chiamata quando si salva la ricetta modificata
    aggiorna(ricettaModificata)
    navigate(`/ricette/${id}`)
  }

  return (
    <>
      <RecipeForm ricettaIniziale={ricetta} onSave={handleSave} onError={(msg) => setToast(msg)} />
      <Toast messaggio={toast} onClose={() => setToast('')} />
    </>
  )
}