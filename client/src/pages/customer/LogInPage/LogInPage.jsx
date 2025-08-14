import React, { useEffect, useState } from 'react';
import google from '../../../assets/google.png';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { searchEmail } from '@/services/authService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const LogInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [debounceEmail, setDebounceEmail] = useState('');
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      'email': '',
      'password': '',
      'confirmPassword': '',
    }
  });

  const email = watch('email');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceEmail(email);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  useEffect(() => {
    const onCheckEmail = async () => {
      try {
        const status = await searchEmail(debounceEmail);
        if (status === 400) {
          setError('email', { type: 'manual', message: 'Email is not registered. Try create account' });
        } else {
          clearErrors('email');
        }
      } catch (err) {
        console.error('Checking email failed', err);
      }
    };

    if (debounceEmail) onCheckEmail();
  }, [debounceEmail, setError, clearErrors]);

  const handlePassword = (e) => {
    e.preventDefault();
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className='w-full h-screen grid grid-cols-2'>
      <div className="h-screen bg-[linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.7)),url('../../../assets/signup.jpg')] bg-cover bg-bottom py-8 px-16 justify-end flex flex-col text-white gap-2">
        <p className='text-4xl font-extrabold'>Get Fresh from The Farm</p>
        <p>Join our farm-to-table community and enjoy healthy food delivered to your door.</p>
      </div>
      <div className='flex flex-col justify-center px-24 py-5 bg-white'>
        <p className='text-[var(--primary)] uppercase font-extrabold mb-1'>Login</p>
        <p className='font-bold mb-4 text-3xl'>Welcome Back</p>
        <button className='w-full rounded border border-gray-500 p-2 gap-2 flex justify-center items-center'>
          <img src={google} className='w-4' />
          Login with Google
        </button>
        <div className="flex items-center gap-2 my-4">
          <hr className="flex-grow border-t border-gray-500" />
          <span>or</span>
          <hr className="flex-grow border-t border-gray-500" />
        </div>

        <form
          onSubmit={handleSubmit(async (formData) => {
            await handleLogin(formData);
            navigate('/');
          })}
          className='flex flex-col gap-3'
        >
          <div className='w-full flex flex-col gap-1'>
            <label className='font-bold'>Email</label>
            <input
              {...register('email', {
                required: 'Please enter your email'
              })}
              type='email' placeholder='example@gmail.com'
              className='rounded border empty:border-gray-500 w-full px-2 py-1 valid:border-[var(--primary-dark)] invalid:border-red-500' />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className='relative w-full flex flex-col gap-1'>
            <button
              onClick={handlePassword}
              className='cursor-pointer absolute px-2 py-1 bottom-0 right-0 text-gray-300 active:text-gray-500'
              aria-label={isShowPassword ? 'Hide password' : 'Show password'}
              type="button"
            >
              {isShowPassword ? <VisibilityOff fontSize='small'/> : <Visibility fontSize='small'/>}
            </button>
            <label className='font-bold'>Password</label>
            <input
              {...register('password', {
                required: 'Please enter your password'
              })}
              type={isShowPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              className='rounded border empty:border-gray-500 w-full px-2 py-1 valid:border-[var(--primary-dark)] invalid:border-red-500'
            />
          </div>

          <button className='p-2 bg-[var(--primary)] text-white rounded mt-5 font-bold'>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
