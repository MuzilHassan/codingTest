import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Metrics from "./pages/metrics";
import AddFeedback from "./pages/addFeedback";

function App() {
  console.log(import.meta.env.VITE_API_BASE_URL, "url");
  return (
    <Router>
      <nav className=" flex items-center justify-center my-4 gap-4 ">
        <Link
          to="/"
          className=" text-blue-500 text-lg hover:text-blue-200 hover:underline"
        >
          Home
        </Link>
        <Link
          to="/metrics"
          className=" text-blue-500 text-lg hover:text-blue-200 hover:underline"
        >
          Metrics
        </Link>
        <Link
          to="/add"
          className=" text-blue-500 text-lg hover:text-blue-200 hover:underline"
        >
          Add feedback
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/add" element={<AddFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
