import Link from 'next/link'
import React, { useState } from 'react'

export default function Login() {
  const initialValues = {
    name: '',
    phoneNumber: '',
    haveMoto: false,
    havePermis: false,
    militaryFree: false,
    startingDate: new Date(),
  }

  const [values, setValues] = useState(initialValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/riders', {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(),
        ...values,
      }),
    })

    //return to page 01
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <div className='flex'>
      <div className='border-primaryBorder shadow-default m-auto w-full max-w-md rounded-lg border bg-white px-1'>
        <div className='text-primary m-6'>
          <div className='mt-3 flex items-center justify-center'>
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Créez votre compte
            </h1>
          </div>
          <form
            action='/rider/login/signup'
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <label className='text-left'>
              Quel est votre nom? <i className='text-red-500'>*</i>
            </label>
            <input
              name='name'
              type='text'
              value={values.name}
              onChange={handleInputChange}
              placeholder='name'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            <label>
              Quel est votre numéro de téléphone?{' '}
              <i className='text-red-500'>*</i>
            </label>
            <div className='flex'>
              <p
                className={
                  'text-primary mb-4 rounded-md border p-2 text-sm outline-none'
                }
              >
                +213
              </p>
              <input
                name='phoneNumber'
                type='tel'
                value={values.password}
                onChange={handleInputChange}
                placeholder='0000 000 000'
                className={
                  'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
                }
              />
            </div>
            <label className='text-left'>
              Avez-vous une moto? <i className='text-red-500'>*</i>
            </label>
            <select
              name='haveMoto'
              value={values.haveMoto}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              <option value={true}>Oui </option>
              <option value={false}>Non </option>
            </select>
            <label className='text-left'>
              Avez-vous le permis de catégorie A?{' '}
              <i className='text-red-500'>*</i>
            </label>
            <select
              name='havePermis'
              value={values.havePermis}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              <option value={true}>Oui </option>
              <option value={false}>Non </option>
            </select>
            <label className='text-left'>
              Etes-vous dégagés du service militaire?
              <i className='text-red-500'>*</i>
            </label>
            <select
              name='militaryFree'
              value={values.militaryFree}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              <option value={true}>Oui </option>
              <option value={false}>Non </option>
            </select>
            <label className='text-left'>
              A partir de quand pouvez vous commencer?
              <i className='text-red-500'>*</i>
            </label>
            <input
              name='startingDate'
              type='date'
              value={values.startingDate}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
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
                Login
              </button>
            </div>
          </form>
          <div className='mt-3 flex items-center justify-center'>
            <Link href='/rider/register/signin' passHref>
              <a className='justify-center text-amber-500 hover:underline'>
                Need to login? Sign in now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
