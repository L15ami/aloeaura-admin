import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/router";

export default function Settings() {
  const { data: session } = useSession();
  const router = useRouter();

  async function logout() {
    
    await router.push('/'); // Redirect to the homepage after logout
    await signOut();
  }

  if (!session) {
    // If there's no active session, redirect to login page or show a message
    return (
      <div className="my-10 p-4 text-center">
        <p className="text-gray-700 text-lg">Please sign in to view your settings.</p>
      </div>
    )
  }

  return (
    <div className="my-10 p-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-md leading-6 text-gray-600">
            This information will only be displayed to you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-md">admin.com/</span>
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
                    value={session.user.name}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-md font-medium leading-6 text-gray-900">
                About
              </label>

              <p className="mt-3 text-md leading-6 text-gray-600">You are one of the administrators of this dashboard.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-md font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div className="w-10 h-10">
                  <Image src={session.user.image} alt={session.user.email} width={40} height={40} className="rounded-full" />
                </div>

                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-md leading-6 text-gray-600">You can only view your information, you won&apos;t be able to edit.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 pl-6"
                  value={session.user.name.split(' ')[0]}
                  readOnly
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-md font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 pl-6"
                  value={session.user.name.split(' ')[1]}
                  readOnly
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 pl-6"
                  value={session.user.email}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
                onClick={logout}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-600 px-5 py-3 text-red-600 transition hover:bg-red-700 hover:text-green-100 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> LogOut </span>
              </button>
      </div>
    </div>
  );
}
