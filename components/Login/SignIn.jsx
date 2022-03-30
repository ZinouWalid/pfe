import Link from 'next/link'
import React, { useState } from 'react'

export default function Login() {
  const [values, setValues] = useState({
    user: {
      name: '',
      email: '',
    },
  })

  const handleChange = (e) => {
    setValues({
      user: {
        ...values.user,
        [e.target.name]: e.target.value,
      },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/riders', {
      method: 'GET',
    }).then(async (data) => {
      const resp = await data.json()
      console.log('Auth Rider : ', resp)
    })
  }

  return (
    <div className='flex '>
      <div className='border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-white py-10 px-1'>
        <div className='text-primary m-6'>
          <div className='mt-3 flex items-center justify-center'>
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Connectez-vous à votre compte
            </h1>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <label className='text-left'>Nom :</label>
            <input
              name='name'
              type='text'
              value={values.user.name}
              onChange={handleChange}
              placeholder='name'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            <label>E-mail :</label>
            <input
              name='email'
              type='email'
              value={values.user.email}
              onChange={handleChange}
              placeholder='email'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            <div className='mt-3 flex items-center justify-center'>
              <button
                type='submit'
                className={
                  'text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                }
                value='Login'
              >
                S'identifier
              </button>
            </div>
          </form>
          <div className='mt-3 flex items-center justify-center'>
            <Link href='/rider/register/signup' passHref>
              <a className='justify-center text-amber-500 hover:underline'>
                Besoin de vous inscrire? Inscription gratuite
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
