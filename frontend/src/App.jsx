import Footer from './components/layout/Footer.jsx'
import Header from './components/layout/Header.jsx'
import TasksPage from './pages/TasksPage.jsx'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-container">
        <TasksPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
