import './App.scss';
//import Ticker from "./components/Ticker/Ticker.js";
import CommandCenter from "./components/CommandCenter/CommandCenter.js";
import Store from "./store/";
require('dotenv').config();

function App() {

  return (
    <Store>
      <div className="App">
        <CommandCenter></CommandCenter>
      </div>
    </Store>
  );
}

export default App;
