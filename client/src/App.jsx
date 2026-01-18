import { Routes, Route } from "react-router-dom"
import PatientForm from "./pages/PatientForm"
import StaffView from "./pages/StaffView"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PatientForm />} />
      <Route path="/staff" element={<StaffView />} />
    </Routes>
  )
}

export default App
