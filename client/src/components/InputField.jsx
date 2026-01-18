export default function InputField({
  label,
  register,
  name,
  error,
  type = "text",
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        {...register(name)}
        disabled={disabled}
        className={`border rounded px-3 py-2
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  )
}
