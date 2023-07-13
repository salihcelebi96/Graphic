import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveData, setPieChartData } from '../redux/pieChartSlice';
import { Link } from 'react-router-dom';

const Main = () => {
  const [totalShot, setTotalShot] = useState('');
  const [successShot, setSuccessShot] = useState('');
  const [unSuccessShot, setUnSuccessShot] = useState('');

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

  const handleSaveClick = () => {
    const newData = {
      totalShot: Number(totalShot),
      successShot: Number(successShot),
      unSuccessShot: Number(unSuccessShot),
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
    <div className="flex justify-center mt-5 gap-9 mx-5">
      <div className="flex flex-col">
        <label htmlFor="totalShot">Total Shot: </label>
        <input
          className="w-[100px]"
          type="text"
          id="totalShot"
          value={totalShot}
          onChange={handleTotalShotChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="successShot">Success Shot: </label>
        <input
          className="w-[100px]"
          type="text"
          id="successShot"
          value={successShot}
          onChange={handleSuccessShotChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="unSuccessShot">Unsuccess Shot: </label>
        <input
          className="w-[118px]"
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
      <div className="ml-auto flex items-center">
        <Link to="/store">Go to Store</Link>
      </div>
    </div>
  );
};

export default Main;
