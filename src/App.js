import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Main from "./views/Main";
import SearchMap from "./views/SearchMap";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main /> } exact={true} />
        <Route path="/map" element={ <SearchMap /> } />
      </Routes>
    </div>
  );
}

export default App;


{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          npx create-react-app 프로젝트이름 치면 폴더가 만들어짐 - 그 cd 폴더로 들어가서 npm run start
        </a>
      </header> */}