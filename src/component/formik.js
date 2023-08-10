import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setUser } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const FormikForm = () => {

    const labelStyle = {
        color: 'white', 
        fontSize: '16px', 
        marginBottom: '8px', 
        fontWeight: 'bold'
      };
      



    const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    
    const newUser = {
      username: 'john_doe',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    dispatch(setUser(newUser));
    console.log(user);

    if (user.username && user.name && user.surname && user.email && user.password) {
        navigate("/");
      }

    
  };

 

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    
    handleSubmit();
    
    
  }, []);

 

  return (
    <div className='h-full w-full   flex flex-col justify-center items-center'>
      
        
      <div className="signUp absolute top-0.5">
      <h2 className='my-10 flex justify-center text-white font-bold  text-4xl'>Sign Up</h2>
      <Formik
        initialValues={{
          username: '',
          name: '',
          surname: '',
          email: '',
          password: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form className='border-2 text-black p-12 px-20'>
            <div className='flex flex-col  '>
              <label style={labelStyle} htmlFor='username'>Username:</label>
              <Field className="w-80 py-1 border rounded-sm bg-gray-300"  type='text' id='username' name='username' />
              <ErrorMessage name='username' component='div' />
            </div>
            <div className='flex flex-col'>
              <label style={labelStyle} htmlFor='name'>Name:</label>
              <Field className="w-80 py-1 border rounded-sm bg-gray-300"  type='text' id='name' name='name' />
              <ErrorMessage name='name' component='div' />
            </div>
            <div className='flex flex-col'>
              <label style={labelStyle} htmlFor='surname'>Surname:</label>
              <Field className="w-80 py-1 border rounded-sm bg-gray-300"  type='text' id='surname' name='surname' />
              <ErrorMessage name='surname' component='div' />
            </div>
            <div className='flex flex-col'>
              <label style={labelStyle} htmlFor='email'>Email:</label>
              <Field className="w-80 py-1 border rounded-sm bg-gray-300"  type='email' id='email' name='email' />
              <ErrorMessage name='email' component='div' />
            </div>
            <div className='flex flex-col'>
              <label style={labelStyle} htmlFor='password'>Password:</label>
              <Field className="w-80 py-1 border rounded-sm bg-gray-300"  type='password' id='password' name='password' />
              <ErrorMessage name='password' component='div' />
            </div>
            <button
              className='flex w-full bg-green-700 py-1 hover:bg-green-600 text-white my-4 justify-center border rounded-sm'
              type='submit'
              onClick={handleSubmit}
              disabled={isSubmitting || !isValid}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      </div>
      
    </div>
  );
};

export default FormikForm;
