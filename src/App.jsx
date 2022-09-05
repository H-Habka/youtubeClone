import { HashRouter as Router , Routes, Route } from "react-router-dom";
import {
  Feed,
  VideoDetails,
  ChannelDetails,
  Navbar,
  PlaylistDetails,
} from "./Components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className="bg-black text-white min-h-screen w-screen">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/playlist/:id" element={<PlaylistDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
