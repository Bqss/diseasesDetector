import { useState } from "react";
import axios from "axios"
import "./App.css";
import { useMutation } from "react-query";
import { Penyakit as penyakit } from "./payload";
import Penyakit from "./component/Penyakit";

const instance = axios.create({
  baseURL : "http://localhost:5000"
})


function App() {

  const [gejala, setGejala] = useState<string>("");
  const {data =[] , mutate ,isLoading} = useMutation(async(gejala: string) => {
    const result = await instance.get<Array<penyakit>>("/diagnosa?gejala="+gejala);
    return result.data;
  })




  return (
    <div className="container">
      <h1>Detector penyakit</h1>
      <div className="diagnose">
        <label htmlFor="gejala">Masukkan gejala penyakit</label>
        <div className="diagnose__form">
          <input
            type="text"
            name="gejala"
            value={gejala}
            onChange={(ev) => setGejala(ev.target.value)}
            id="gejala"
            className="diagnose__input"
          />
          <button className="diagnose__button" onClick={() => mutate(gejala.trim( ))}>Diagnosa</button>
        </div>
        <div className="diagnose__result">
          {isLoading ? <span>Loading...</span> : (
            data.length >0 ? (
              <>
                {data.map(e  => <Penyakit data={e}/>)}
              </>
            ) : <div>Penyakit tidak diketahui</div>
          )}
        </div>
      </div>
              
    </div>
  );
}

export default App;
