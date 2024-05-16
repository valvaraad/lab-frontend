import './App.css'
import ListPlayerComponent from "./components/ListPlayerComponent.jsx";
import ListCountryComponent from "./components/ListCountryComponent.jsx";
import ListChampionshipComponent from "./components/ListChampionshipComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PlayerComponent from "./components/PlayerComponent.jsx";
import CountryComponent from "./components/CountryComponent.jsx";
import ChampionshipComponent from "./components/ChampionshipComponent.jsx";
import MainPageComponent from "./components/MainPageComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<MainPageComponent/>}/>

                <Route path='/players' element={<ListPlayerComponent/>}/>
                <Route path='/addplayer' element={<PlayerComponent/>}/>
                <Route path='/updateplayer/:id' element={<PlayerComponent/>}/>

                <Route path='/countries' element={<ListCountryComponent/>}/>
                <Route path='/addcountry' element={<CountryComponent/>}/>
                <Route path='/updatecountry/:id' element={<CountryComponent/>}/>

                <Route path='/championships' element={<ListChampionshipComponent/>}/>
                <Route path='/addchampionship' element={<ChampionshipComponent/>}/>
                <Route path='/updatechampionship/:id' element={<ChampionshipComponent/>}/>
            </Routes>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
