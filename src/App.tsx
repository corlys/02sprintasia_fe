import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, TaskPage, SubTaskPage } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/subtask/:id" element={<SubTaskPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
