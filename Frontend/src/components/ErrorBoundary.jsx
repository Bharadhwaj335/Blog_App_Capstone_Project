import { useRouteError, Link } from "react-router";

function ErrorBoundary() {
  const { data, status, statusText } = useRouteError();
  return (
    <div className="text-center p-20">
    <img className="block mx-auto rounded-2xl w-2xl mb-7" src="https://media.tenor.com/WqGTNFmFqjkAAAAM/saquontroll-saquonjudge26.gif" alt="" />
      <p className="text-4xl">{data}</p>
      <p className="text-6xl text-red-400 mb-8">
        {status}-{statusText}
      </p>
      <Link to="/" className="mt-8 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
        Return to Home
      </Link>
    </div>
  );
}

export default ErrorBoundary;
