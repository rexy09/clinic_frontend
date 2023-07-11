import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Visits from "./pages/Visits";
import Patients from "./pages/Patients";

function App() {
  return (
    <Router>
      <div className="">
        <Layout>
          <Routes>
            <Route exact path="/" element={<Register />}></Route>
            <Route exact path="/visits" element={<Visits />}></Route>
            <Route exact path="/patients" element={<Patients />}></Route>
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
