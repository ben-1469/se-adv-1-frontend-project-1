import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const formInputs = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
];

const SignInPage = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await axios.post(
        'http://localhost:4000/users/login',
        formData,
      );
      if (result.status === 200) {
        console.log('Successfully logged in');
        console.log(result.data);
        window.localStorage.setItem('token', result.data);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex h-screen min-h-full'>
      <div className='flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='w-full max-w-sm mx-auto lg:w-96'>
          <div>
            <img
              className='w-auto h-12'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <div className='mt-8'>
            <div className='mt-6'>
              <form className='space-y-6'>
                {formInputs.map((input) => (
                  <div>
                    <label
                      htmlFor={input.name}
                      className='block text-sm font-medium text-gray-700'
                    >
                      {input.label}{' '}
                    </label>
                    <div className='mt-1'>
                      <input
                        id={input.name}
                        name={input.name}
                        onChange={handleInputChange}
                        value={formData[input.name]}
                        type={input.type}
                        required
                        className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    onClick={handleSubmit}
                    type='submit'
                    className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex-1 hidden w-0 lg:block'>
        <img
          className='absolute inset-0 object-cover w-full h-full'
          src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
          alt=''
        />
      </div>
    </div>
  );
};

export default SignInPage;
