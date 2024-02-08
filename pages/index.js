import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  
  const { data: session } = useSession()
  if(session) {
    return <>
     <header>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">Welcome Back , <span className="text-green-700">{session.user.name}!</span></h1>

        <p className="mt-1.5 text-md text-gray-500 max-w-lg"> View the statistics about your business. Also manage and add products. 🎉</p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        <Link
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
          href={"/products"}
        >
          <span className="text-md font-medium"> View Products </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>

        <button
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-green-500 transition hover:bg-green-700 hover:text-green-100 focus:outline-none focus:ring"
          type="button"
        >
          <span className="text-md font-medium"> View Website </span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

        </button>
      </div>
    </div>
  </div>
</header>

<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200"></div>
  <div className="h-32 rounded-lg bg-gray-200"></div>
  <div className="h-32 rounded-lg bg-gray-200"></div>
  <div className="h-32 rounded-lg bg-gray-200"></div>
</div>

    </>
  }
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl m-auto">
        <h1 className="text-4xl font-bold max-w-lg text-center">
          Welcome to the Admin Dashboard
        </h1>
        <p className=" font-medium my-4 justify-center">
          An account is needed to access the dashboard.
        </p>
        <button
          className="inline-block rounded border border-green-600 bg-green-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
          onClick={() => signIn('google')}
          href="#"
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}
