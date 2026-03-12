import { useNavigate } from 'react-router-dom'

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MealLog from './pages/MealLog'
import RecipeList from './pages/RecipeList'
import RecipeDetail from './pages/RecipeDetail'
import RecipeForm from './components/RecipeForm'
import { useRecipes } from './hooks/useRecipes'

function NuovaRicetta() {
  const { aggiungi } = useRecipes()
  const navigate = useNavigate()

  const handleSave = (ricetta) => {
    aggiungi(ricetta)
    navigate('/ricette')
  }

  return <RecipeForm onSave={handleSave} />
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MealLog />} />
        <Route path="/ricette" element={<RecipeList />} />
        <Route path="/ricette/nuova" element={<NuovaRicetta />} />
        <Route path="/ricette/:id" element={<RecipeDetail />} />
      </Routes>
    </Layout>
  )
}