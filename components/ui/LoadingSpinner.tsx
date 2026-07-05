export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-accent-blue/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-blue animate-spin" />
        </div>
        <p className="text-gray-500 text-sm font-mono">Loading...</p>
      </div>
    </div>
  )
}
