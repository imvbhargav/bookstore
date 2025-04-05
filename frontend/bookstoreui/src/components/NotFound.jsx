import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-2xl">404: Not Found</h1>
      <p className="font-medium">
        Maybe you took a wrong turn somewhere.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <Link to={"/"} className="py-2 px-4 bg-black rounded-md text-white">GO HOME</Link>
      </div>
    </div>
  );
}

export default NotFound;