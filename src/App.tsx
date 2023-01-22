import "./App.css";
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import NavBar from "./components/NavBar/NavBar";
import Quotes from "./components/Quotes/Quotes";
import Tasks from "./components/Tasks/Tasks";

// TODO
// je vais faire un store pour un truc
// seulement je pense, c'est si il quite le document qu'il crée, les infos restent présente
// quand il reviens
// avec un truc du style popup qui te dis "Données déja présente, voulez-vous les charger ?"

function App() {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <AsideBar />
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <NavBar />
          <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 relative">
            <div className="flex flex-col flex-wrap sm:flex-row">
              <Quotes />
              <section className="hidden sm:block sticky top-0 h-full w-full sm:w-1/2 xl:w-1/3">
                <Calendar />
                <Tasks />
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
