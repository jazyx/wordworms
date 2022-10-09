
import { GameProvider } from './contexts/Game';
import Tabs from './components/Tabs'


function App() {
  
  return (
    <GameProvider>
      <h1>WordWorms</h1>
      <Tabs />
    </GameProvider>
  );

}

export default App;
