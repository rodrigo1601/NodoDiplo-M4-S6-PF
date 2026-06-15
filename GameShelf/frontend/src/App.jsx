import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './router/AppRouter'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <BrowserRouter>

      <Header />

      <Toaster position="top-right" />
      
      <AppRouter />

      <Footer />
      
    </BrowserRouter>
  )
}

export default App
