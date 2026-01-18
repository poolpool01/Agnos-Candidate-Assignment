export default function InfoRow({ label, value }) {
  if (!value) return null

  return (
    <div className="flex justify-between border-b py-2">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-900 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  )
}
