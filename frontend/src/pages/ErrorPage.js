import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, this page does not exist 😫</p>
      <img
        src="https://media.tenor.com/0P9HnYj-1UIAAAAM/bhupendrab-jogi-naam-batiye.gif"
        alt="Error Image"
      />
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
      <p>
        <NavLink
          to="/signUp"
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          Go to Sign Up Page 🙂
        </NavLink>
      </p>
    </div>
  );
}
