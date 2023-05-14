import React from "react";

interface PenyakitProps {
  data: {
    id: Number;
    nama_penyakit: string;
    definisi: string;
    persentase: number
  };
}

const Penyakit = ({data}: PenyakitProps) => {
  return (
    <div className="penyakit" >
      <p>Nama Penyakit : {data.nama_penyakit}</p>
      <p>Definisi : {data.definisi}</p>
      <p>Persentase : {data.persentase}%</p>
    </div>
  )
};

export default Penyakit;
