import "./global.css";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-600 to-indigo-300">
      <Header />
      <CurrentWeather />
      <Footer />
    </div>
  );
}

export default App;
