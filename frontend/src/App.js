import './App.css';

function App() {
  return (
    <div className="App">
      <head>
        <title>Tiger Traits Web App</title>
      </head>
      <body>
      <div class = "container">
        <div class = "start">
          <header className="App-header">
            <p>
              Welcome to Tiger Traits, {user.name || 'Unknown User'}!
            </p>
          </header>
        </div> 
      </div>
      </body>
    </div>
  );
}

const user = {
  name: "Default User",
  type: "unknown"
}

export default App;
