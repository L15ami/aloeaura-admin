import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();

  const router = useRouter();
  const { pathname } = router;
  const active = "text-green-600 transition hover:text-gray-500/75 p-3 bg-gray-100 rounded-md";
  const inactive = "text-gray-500 transition hover:text-gray-500/75 p-3";

  if (session) {
    return (
      <>
        <header className="bg-white border-b sticky top-0">
          <div className="lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 md:flex md:items-center md:gap-12">
                <a className="block text-teal-600" href="#">
                  <span className="sr-only">Home</span>
                  <Image
  src="/logo/logo-01-01.png"
  alt="Logo"
  width={75}
  height={50}
  
/>

                </a>
              </div>

              <div className="md:flex md:items-center md:gap-12">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-lg text-bold">
                    <li>
                      <Link
                        className={pathname === '/' ? active : inactive}
                        href="/"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname === '/products' ? active : inactive}
                        href="/products"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname === '/category' ? active : inactive}
                        href="#"
                      >
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname === '/orders' ? active : inactive}
                        href="#"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname === '/settings' ? active : inactive}
                        href="/settings"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <div className="h-10 w-10">
                      <Image
  src={session.user.image}
  alt="User Image"
  width={100}
  height={100}
  className="h-full w-full rounded-full object-cover object-center"
/>

                    </div>
                  </div>

                  <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
