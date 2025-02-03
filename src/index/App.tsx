import { useEffect } from "react";
import socketService from "../service/socketService";
import Stack from "../stack/Stack";

function App() {
  useEffect(() => {
    socketService.initializeSocket();
    //   return () => {
    //     socketService.removeListener("i_am_online");

    // };
  }, []);
  return (
    <>
      <Stack />
    </>
  );
}

export default App;
