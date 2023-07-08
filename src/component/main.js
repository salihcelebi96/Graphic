import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPieChartData } from '../redux/pieChartSlice';

const Main = () => {
  const [totalShot, setTotalShot] = useState("");
  const [successShot, setSuccessShot] = useState("");
  const [unSuccessShot, setUnSuccessShot] = useState("");

  const dispatch = useDispatch();

  const handleTotalShotChange = (e) => {
    setTotalShot(Number(e.target.value));
  };

  const handleSuccessShotChange = (e) => {
    setSuccessShot(Number(e.target.value));
  };

  const handleUnSuccessShotChange = (e) => {
    setUnSuccessShot(Number(e.target.value));
  };

  const handleButtonClick = () => {
    dispatch(setPieChartData({ successShot, unSuccessShot }));
  };

  return (
    <div className='flex  justify-center mt-5 gap-9'>
      <div className='flex flex-col'>
        <label htmlFor="totalShot">Total Shot: </label>
        <input className='w-[100px]' type="text" id="totalShot" value={totalShot} onChange={handleTotalShotChange} />
      </div>
      <div className='flex flex-col' >
        <label htmlFor="successShot">Success Shot: </label>
        <input className='w-[100px]' type="text" id="successShot" value={successShot} onChange={handleSuccessShotChange} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="unSuccessShot">Unsuccess Shot: </label>
        <input className='w-[100px]' type="text" id="unSuccessShot" value={unSuccessShot} onChange={handleUnSuccessShotChange} />
      </div>
      <button className="mx-5" onClick={handleButtonClick}>Güncelle</button>
    </div>
  );
};

export default Main;
