import './App.scss';
import CommandCenter from "./components/CommandCenter/CommandCenter.js";
require('dotenv').config();

function App() {

  return (
      <div className="App">
        <CommandCenter></CommandCenter>
      </div>
  );
}

export default App;
