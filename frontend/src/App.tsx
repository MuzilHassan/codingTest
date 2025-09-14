import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ISSMHome from "./pages/home";
import ISSMMetrics from "./pages/metrics";
import ISSMAddFeedback from "./pages/addFeedback";

function App() {
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
        <Route path="/" element={<ISSMHome />} />
        <Route path="/metrics" element={<ISSMMetrics />} />
        <Route path="/add" element={<ISSMAddFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
