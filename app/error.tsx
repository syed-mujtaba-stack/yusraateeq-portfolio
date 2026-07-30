"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
