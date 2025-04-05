function UserInput({  name, value, label, onchange }) {
  return (
    <div className="w-full flex gap-2 border-2 border-black rounded-md p-2 mb-2">
      <label className="flex-1 text-left border-r-2 border-black pr-2 md:pr-0" htmlFor={name}>
        {label}
      </label>
      <input
        className="flex-1/2 focus:outline-none"
        id={name} type="text" name={name} value={value} autoComplete="off"
        onChange={onchange}
      />
    </div>
  );
}

export default UserInput;