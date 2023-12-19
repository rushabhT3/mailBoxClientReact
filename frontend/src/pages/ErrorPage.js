import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" class="py-10 px-6 w-full">
      <div class="mb-4">
        <h1 class="text-4xl font-bold text-center">Oops!</h1>
      </div>
      <div class="mb-4 text-gray-500 text-lg text-center">
        <p>Sorry, this page does not exist </p>
      </div>
      <div class="mx-auto mt-8">
        <img
          src="https://media.tenor.com/0P9HnYj-1UIAAAAM/bhupendrab-jogi-naam-batiye.gif"
          alt="Error Image"
        />
      </div>
      <div class="text-sm text-gray-400 text-center">
        <i>{error.statusText || error.message}</i>
      </div>
      <NavLink
        to="/signUp"
        class="inline-block text-blue-500 hover:text-blue-700 hover:underline"
      >
        Go to Sign Up Page
      </NavLink>
    </div>
  );
}
