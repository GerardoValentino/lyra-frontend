import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./views/IndexPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IndexPage />}/>
                {/* <Route path='/favorites' element={<FavoritesPage />}/>
                <Route path='/about' element={<AboutPage />}/> */}
            </Routes>
        </BrowserRouter>
    );
}