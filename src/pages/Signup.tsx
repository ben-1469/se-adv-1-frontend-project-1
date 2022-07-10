import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const signupFormInputs = [
  {
    title: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    title: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
  {
    title: 'First Name',
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
  },
  {
    title: 'Last Name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
  },
  {
    title: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'Username',
  },
];

function SignupPage() {
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await axios.post('http://localhost:4000/users', formData);

      if (result.status === 200 && result.data.id) {
        console.log('Successfully created user');
        navigate('/signin');
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-center h-screen min-h-full py-12 sm:px-6 lg:px-8 bg-violet-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
          Sign up for an account!
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6'>
            {signupFormInputs.map((input) => (
              <div key={input.name}>
                <label
                  htmlFor='text'
                  className='block text-sm font-medium text-gray-700'
                >
                  {input.title}
                </label>
                <div className='mt-1'>
                  <input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    onChange={handleInputChange}
                    required
                    className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
                  />
                </div>
              </div>
            ))}

            <div>
              <button
                type='submit'
                className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
