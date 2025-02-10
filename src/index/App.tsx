import { useEffect } from "react";
import socketService from "../service/socketService";
import Stack from "../stack/Stack";

function App() {
  useEffect(() => {
    socketService.initializeSocket();
  }, []);
  return (
    <>
      <Stack />
    </>
  );
}

export default App;
