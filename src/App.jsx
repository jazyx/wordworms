
import { GameProvider } from './contexts/Game';
import Players from './components/Players';
import Settings from './components/Settings';
import PlayerWords from './components/PlayerWords'
import NewGame from './components/NewGame'


function App() {
  
  return (
    <GameProvider>
      <h1>WordWorms</h1>
      <Players />
      <Settings />
      <PlayerWords />
      <NewGame />
    </GameProvider>
  );

}

export default App;
