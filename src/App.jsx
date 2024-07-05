import About from "./components/About/About"
import Banner from "./components/Banner/Banner"
import Navbar from "./components/Navbar/Navbar"
import Technologies from "./components/Technologies/Technologies"


function App() {

  return (
    // <div className="container mx-auto">
      <div className="overflow-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="fixed  top-0 -z-10 w-full h-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        
            <div className="container mx-auto">
            <Navbar></Navbar>
            <Banner></Banner>
            <About></About>
            <Technologies></Technologies>
            </div>
    
      </div>



  )
}

export default App
