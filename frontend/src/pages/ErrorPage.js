import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div id="error-page" className="py-10 px-6 w-full">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center">Oops!</h1>
      </div>
      <div className="mb-4 text-gray-500 text-lg text-center">
        <p>Sorry, this page does not exist </p>
      </div>
      <div className="mx-auto mt-8">
        <img
          src="https://media.tenor.com/0P9HnYj-1UIAAAAM/bhupendrab-jogi-naam-batiye.gif"
          alt="Error Image"
        />
      </div>
      <NavLink
        to="/signUp"
        className="inline-block text-blue-500 hover:text-blue-700 hover:underline"
      >
        Go to Sign Up Page
      </NavLink>
    </div>
  );
}
