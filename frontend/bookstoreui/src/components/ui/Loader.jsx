import Spinner from "./Spinner";

function Loader() {
  return (
    <div className="p-10 rounded-md flex flex-col justify-center items-center absolute h-screen w-screen">
      <Spinner />
      <p className="text-sm font-black mt-8">Loading...</p>
    </div>
  );
}

export default Loader;