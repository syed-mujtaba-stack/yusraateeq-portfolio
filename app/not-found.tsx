import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white mb-4">
          4<span className="text-purple-400">0</span>4
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
