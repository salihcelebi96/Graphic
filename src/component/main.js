import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveData, setPieChartData } from '../redux/pieChartSlice';
import { Link } from 'react-router-dom';

const Main = () => {
  const [totalShot, setTotalShot] = useState('');
  const [successShot, setSuccessShot] = useState('');
  const [unSuccessShot, setUnSuccessShot] = useState('');
  const [chartName, setChartName] = useState('');

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

  const handleChartNameChange = (e) => {
    setChartName(e.target.value);
  };

  const handleSaveClick = () => {
    if (!totalShot || !successShot || !unSuccessShot || !chartName) {
      alert('Please fill in all the fields.');
      return;
    }

    const newData = {
      totalShot: Number(totalShot),
      successShot: Number(successShot),
      unSuccessShot: Number(unSuccessShot),
      chartName: chartName,
    };

    dispatch(saveData(newData));

    let existingData = JSON.parse(localStorage.getItem('savedData')) || [];

    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    const updatedData = [...existingData, newData];

    localStorage.setItem('savedData', JSON.stringify(updatedData));
  };

  const handleUpdateClick = () => {
    if (!totalShot || !successShot || !unSuccessShot) {
      return; // Yeni değer girilmediyse güncelleme yapma
    }

    const updatedSuccessShot = Number(totalShot) - Number(unSuccessShot);
    const updatedUnSuccessShot = Number(totalShot) - Number(successShot);

    setSuccessShot(updatedSuccessShot);
    setUnSuccessShot(updatedUnSuccessShot);

    dispatch(setPieChartData({ successShot: updatedSuccessShot, unSuccessShot: updatedUnSuccessShot }));
  };

  return (
    <div className="flex justify-center pt-5 gap-9 mx-5 bg-gray-600">
      <div className="flex flex-col">
        <label htmlFor="chartName">Chart Name: </label>
        <input
          className="w-[120px] bg-gray-700 border-none outline-none"
          type="text"
          id="chartName"
          value={chartName}
          onChange={handleChartNameChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="totalShot">Total Shot: </label>
        <input
          className="w-[100px] bg-gray-700 outline-none"
          type="text"
          id="totalShot"
          value={totalShot}
          onChange={handleTotalShotChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="successShot">Success Shot: </label>
        <input
          className="w-[100px] bg-gray-700 outline-none"
          type="text"
          id="successShot"
          value={successShot}
          onChange={handleSuccessShotChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="unSuccessShot">Unsuccess Shot: </label>
        <input
          className="w-[110px] bg-gray-700 outline-none"
          type="text"
          id="unSuccessShot"
          value={unSuccessShot}
          onChange={handleUnSuccessShotChange}
        />
      </div>

      <div className="flex items-start gap-5">
        <button onClick={handleSaveClick}>Kaydet</button>
        <button onClick={handleUpdateClick}>Güncelle</button>
      </div>
      <div className="ml-auto flex">
        <Link to="/store">Go to Store</Link>
      </div>
    </div>
  );
};

export default Main;
