import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import MealLog from './pages/MealLog'
import RecipeList from './pages/RecipeList'
import RecipeDetail from './pages/RecipeDetail'
import RecipeForm from './components/RecipeForm'
import { useRecipes } from './hooks/useRecipes'
import RecipeEdit from './pages/RecipeEdit'
import { useState } from 'react'
import Toast from './components/Toast'

function NuovaRicetta() {
  const { aggiungi } = useRecipes()
  const navigate = useNavigate()
  const [toast, setToast] = useState('')

  const handleSave = (ricetta) => {
    aggiungi(ricetta)
    navigate('/ricette')
  }

  return (
    <>
      <RecipeForm onSave={handleSave} onError={(msg) => setToast(msg)} />
      <Toast messaggio={toast} onClose={() => setToast('')} />
    </>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MealLog />} />
        <Route path="/ricette" element={<RecipeList />} />
        <Route path="/ricette/nuova" element={<NuovaRicetta />} />
        <Route path="/ricette/:id" element={<RecipeDetail />} />
        <Route path="/ricette/:id/modifica" element={<RecipeEdit />} />
      </Routes>
    </Layout>
  )
}