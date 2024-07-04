import Banner from "./components/Banner/Banner"
import Navbar from "./components/Navbar/Navbar"


function App() {

  return (
    // <div className="container mx-auto">
      <div className="overflow-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="fixed  top-0 -z-10 w-full h-full"></div>
        <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="container mx-auto">
            <Navbar></Navbar>
            <Banner></Banner>
            </div>
    </div>
      </div>



  )
}

export default App
