import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Header from '../../Header'

export default function Register() {
  const router = useRouter()
  const initialValues = {
    username: '',
    email: '',
    password: '',
  }

  const [values, setValues] = useState(initialValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('values submited: ', values)
    await fetch('/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(),
        ...values,
      }),
    }).then((response) => {
      console.log('response returned : ', response.json())
      if (response.status === 200) {
        //return to auth page'
        router.push('/client/auth/signin')
      } else {
        alert("error : nom d'utilisateur ou l'email existe déjà")
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <div className='flex mt-16'>
      <Header hideSearch={true} hideBasket={true} hideOptions={true} />
      <div className='mt-16 border-slate-700 m-auto w-full max-w-md rounded-lg border bg-white px-1'>
        <div className='text-primary m-6'>
          <div className='mt-3 flex items-center justify-center'>
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Créez votre compte
            </h1>
          </div>
          <form action='' onSubmit={handleSubmit}>
            {/* ----------------Nom------------- */}
            <label className='text-left'>
              Quel est votre nom? <i className='text-red-500'>*</i>
            </label>
            <input
              name='username'
              type='text'
              value={values.username}
              onChange={handleInputChange}
              placeholder='nom'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            {/* ----------------E-mail------------- */}
            <label className='text-left'>
              Quel est votre e-mail? <i className='text-red-500'>*</i>
            </label>
            <input
              name='email'
              type='email'
              value={values.email}
              onChange={handleInputChange}
              placeholder='E-mail'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            {/* ----------------Password------------- */}
            <label className='text-left'>
              Entrer votre mot de passe <i className='text-red-500'>*</i>
            </label>
            <input
              name='password'
              type='password'
              value={values.password}
              onChange={handleInputChange}
              placeholder='mot de passe'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            <div className='mt-3 flex items-center justify-center'>
              <button
                className={
                  'text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                }
                type='submit'
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
          <div className='mt-3 flex items-center justify-center'>
            <Link href='/client/auth/signin' passHref>
              <a className='justify-center text-amber-500 hover:underline'>
                Besoin de vous connecter ? Connectez vous maintenant
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
