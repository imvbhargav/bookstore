function Spinner() {
  return (
    <div className="aspect-square w-32 md:w-40 rounded-full bg-linear-to-r from-transparent from-40% to-blue-500 flex justify-center items-center animate-spin">
      <div className="w-[90%] bg-white aspect-square rounded-full">
      </div>
    </div>
  );
}

export default Spinner;