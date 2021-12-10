import "./App.css";
import Header from "./screens/header";
import Container from "@mui/material/Container";
import RoutesComponent from "./helper/routes";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Container maxWidth="xl" className="app-container">
        <RoutesComponent />
      </Container>
    </Router>
  );
};

export default App;
