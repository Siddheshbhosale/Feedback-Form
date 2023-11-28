import logo from './logo.svg';
import ResponsiveAppBar from './Components/NavBar';
import FormComponent from './Components/Form/FormComponent';
import DataGridComponent from './Components/DataDisplay';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <DataGridComponent/> */}
        <ResponsiveAppBar />
        <Routes>
          <Route path='/form' element={<FormComponent />} />
          <Route path='/data' element={<DataGridComponent />} />
        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
