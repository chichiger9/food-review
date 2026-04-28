import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RouteSkeleton from './components/RouteSkeleton'
import { ThemeSync } from './ThemeSync'

const HomePage = lazy(() => import('./pages/HomePage'))
const ReviewsListPage = lazy(() => import('./pages/ReviewsListPage'))
const ReviewDetailPage = lazy(() => import('./pages/ReviewDetailPage'))

export default function App() {
  return (
    <BrowserRouter>
      <ThemeSync />
      <Layout>
        <Suspense fallback={<RouteSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reviews" element={<ReviewsListPage />} />
            <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
