import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, setPieChartData } from '../redux/pieChartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Login from "../component/Login";
import { useAuth0 } from '@auth0/auth0-react';




const Main = () => {


  const { logout, isAuthenticated } = useAuth0();


  const [totalShot, setTotalShot] = useState('');
  const [successShot, setSuccessShot] = useState('');
  const [unSuccessShot, setUnSuccessShot] = useState('');
  const [chartName, setChartName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("maine js", user)












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
    if (!isAuthenticated) {
      toast.error('Lütfen hesabınıza giriş yapın.');
      return;
    }

    if (!totalShot || !successShot || !unSuccessShot || !chartName) {
      toast.error('Lütfen tüm alanları doldurun.');
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
    toast.success('Veriler başarıyla kaydedildi.');
  };


  const handleUpdateClick = () => {
    if (!totalShot || !successShot || !unSuccessShot) {
      return; 
    }

    const updatedSuccessShot = Number(totalShot) - Number(unSuccessShot);
    const updatedUnSuccessShot = Number(totalShot) - Number(successShot);

    setSuccessShot(updatedSuccessShot);
    setUnSuccessShot(updatedUnSuccessShot);

    dispatch(setPieChartData({ successShot: updatedSuccessShot, unSuccessShot: updatedUnSuccessShot }));
  };

  return (
    <div className='flex  '>
      <div className="flex  w-full   justify-between  pt-5 gap-9 mx-5 ">
        <div className='flex flex-col  gap-10'>
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

          <div className="flex   items-start gap-5">
            <button className='hover:text-gray-400' onClick={handleSaveClick} >Kaydet</button>
            <button className='hover:text-gray-400' onClick={handleUpdateClick} disabled={!isAuthenticated}   >Güncelle</button>
          </div>
        </div>

        <div className='flex  w-60 h-20 items-center relative  gap-10'>

          <div className="ml-auto  flex">
            <Link className='hover:text-gray-400' >
            <Login/>
            </Link>
          </div>
          <div className="ml-auto   rounded-md ">
            <Link className='hover:text-blue-500 ' to="/store">Go to Store</Link>
          </div>
          <div className='toast-notification text-red-600 '>
            <Toaster position="top-right" autoClose={1000} />
          </div>
        </div>


      </div>
    </div>

  );
};

export default Main;
