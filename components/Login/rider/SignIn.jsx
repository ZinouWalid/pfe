import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '../../Header'

export default function SignIn({ csrfToken }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [values, setValues] = useState({
    user: {
      email: '',
      password: '',
    },
  })

  //track the session when it changes
  useEffect(() => {}, [session, status])

  //Error message when the client sign in
  const [err, setErr] = useState('')

  const handleChange = (e) => {
    //Reset the err message to empty message
    setErr('')

    const { name, value } = e.target
    setValues({
      user: {
        ...values.user,
        [e.target.name]: e.target.value,
      },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //Kill the client session if he is already logged in
    //Sign in the rider
    const result = await signIn('rider-provider', {
      redirect: false,
      email: values.user.email,
      password: values.user.password,
    })

    console.log('Rider signed in : ', result, session)

    if (!result.error) {
      // set some auth state
      console.log('Redirecting rider to /rider/id')
      router.push(`/rider/${session?.user.id}`)
    } else {
      console.log('Errrror : ', result.error)
      setErr(result.error)
      setValues({
        user: {
          email: '',
          password: '',
        },
      })
    }
    //signOut('client-provider')
  }

  return (
    <div className='flex mt-16'>
      <Header hideSearch={true} hideBasket={true} hideOptions={true} />

      <div className='mt-16 border-2 border-slate-700 shadow-lg mx-auto my-auto w-full max-w-md rounded-lg border bg-white py-10 px-1 '>
        <div className='text-primary m-6'>
          <div className='mt-3 flex flex-col items-center justify-center'>
            {err && (
              <p className='text-red-500 text-sm font-medium bg-red-200 p-1 rounded'>
                {err}
              </p>
            )}
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Connectez-vous à votre compte
            </h1>
          </div>
          <form
            action='/rider/auth/signin'
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            {/* --------------csrfToken-------------- */}
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
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
            <label className='text-left'>Mot de passe :</label>
            <input
              name='password'
              type='password'
              value={values.user.password}
              onChange={handleChange}
              placeholder='mot de passe'
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
                S&apos;identifier
              </button>
            </div>
          </form>
          <div className='mt-3 flex items-center justify-center'>
            <Link href='/rider/auth/signup' passHref>
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
