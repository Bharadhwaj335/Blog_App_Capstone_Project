import { useRouteError, Link } from "react-router";

function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage = error?.message || error?.data || "An unexpected error occurred";
  const errorStatus = error?.status || 500;
  const statusText = error?.statusText || error?.name || "Error";

  return (
    <div className="text-center p-20">
      <img className="block mx-auto rounded-2xl w-2xl mb-7" src="https://media.tenor.com/WqGTNFmFqjkAAAAM/saquontroll-saquonjudge26.gif" alt="Monkey typing" />
      <p className="text-2xl font-bold text-gray-800 break-words max-w-2xl mx-auto">{String(errorMessage)}</p>
      <p className="text-lg text-red-500 mb-8 mt-2 font-mono">
        {errorStatus} - {statusText}
      </p>
      <Link to="/" className="mt-8 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
        Return to Home
      </Link>
    </div>
  );
}

export default ErrorBoundary;
