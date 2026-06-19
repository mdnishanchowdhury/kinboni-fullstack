export function InputGroup({
  name,
  value,
  placeholder,
  icon,
  onChange,
  error,
}: any) {
  return (
    <div className="w-full">
      <div
        className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-200 ${error ? "border-red-500 ring-2 ring-red-100" : "border-gray-200 focus-within:border-green-500"}`}
      >
        {icon && (
          <div
            className={`pl-3 ${error ? "text-red-400" : "text-gray-400 group-focus-within:text-green-600"}`}
          >
            {icon}
          </div>
        )}
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white p-2.5 outline-none text-sm ${icon ? "pl-2" : "pl-3"}`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
