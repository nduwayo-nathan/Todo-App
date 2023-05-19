
import './App.css';

import Todo from './Todo/todo';

function App() {

  return (
    <div className="App">
       <div className="blur" style={{ top:'5%',right: '-1rem'}}></div>
      <div className="blur" style={{ top:'38%',left: '-1em'}}></div>
      <Todo />
    </div>
  );

}

export default App;
