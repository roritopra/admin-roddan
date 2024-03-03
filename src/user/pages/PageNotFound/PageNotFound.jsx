import { NavLink } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-satoshi font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 font-satoshi text-gray-500">
          We can not find that page.
        </p>

        <NavLink to={"/"}>
          <a className="mt-6 inline-block rounded font-satoshi bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
            Go Back Home
          </a>
        </NavLink>
      </div>
    </div>
  );
}
