import react from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MapComponent from "./components/MapComponent/MapComponent";
import "./App.css";
const App = () => {
  return (
    <div>
      {/* Header Component */}
      <Header />  
       {/* Map and Filter Component */}
      <MapComponent />
       {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default App;
