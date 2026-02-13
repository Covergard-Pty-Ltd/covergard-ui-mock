export default function LazyLoader(message: { message: string }) {
    return (
        <div className="min-h-screen w-full bg-white">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
              <div className="flex flex-col items-center gap-5">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-green-100/80" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-600 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-green-300 animate-spin [animation-duration:1.6s]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500/70" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500/50 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500/30 [animation-delay:300ms]" />
                </div>
                <p className="px-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-green-600/70 sm:text-xs sm:tracking-[0.4em]">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
    );
}
