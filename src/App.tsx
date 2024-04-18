import { Link } from "react-router-dom"

function App() {
  return (
    <div>
      <h1>Landing Page Here</h1>

      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cadastro">Cadastro</Link></li>
      </ul>
    </div>
  )
}

export default App
