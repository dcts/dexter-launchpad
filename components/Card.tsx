import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { TTokenData } from "@/types";

export const Card = ({ coin }: { coin: TTokenData }) => {
  return (
    <div className="rounded-2xl w-[28rem] p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
      <div className="relative z-50">
        <div className="px-4 py-1">
          <figure>
            <Image
              src={coin.imageUrl}
              alt={coin.name}
              width={175}
              height={175}
              className="object-cover py-2 w-full h-64 rounded-xl"
            />
          </figure>

          <h2 className="text-dexter-green text-2xl font-bold tracking-wide mt-4 flex items-center">
            <span className="inline-block text-dexter-green capitalize whitespace-nowrap max-w-32 truncate">
              {coin.name}
            </span>
            <span className="text-dexter-gray uppercase ms-2 max-w-44 truncate">
              (${coin.symbol})
            </span>
          </h2>

          <p className="text-stone-200 text-lg">
            Created by: account...{coin.address.slice(0, 12)}
          </p>

          <p className="mt-2 text-stone-400 tracking-wide leading-relaxed text-sm line-clamp-3">
            {coin.description}
          </p>

          <div className="flex items-center my-2">
            <h2 className="text-xl">Last Price:</h2>
            <div className="ms-auto">
              <span className="text-dexter-green">+65%</span>
              <span className="ms-4 p-1 text-xl bg-dexter-gray-b">
                0.002 XRD
              </span>
            </div>
          </div>

          <div className="flex items-center my-2">
            <h2 className="text-xl whitespace-nowrap">Ready to DeXter:</h2>
            <div className="ms-auto">
              <span className="text-dexter-green whitespace-nowrap">
                `${coin.progress.toFixed(0)}k / 100k XRD`
              </span>
              <span className="ms-2">(`${coin.progress.toFixed(1)}%`)</span>
            </div>
          </div>

          <Progress value={coin.progress} className="h-4" />
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  const randomPercentage = Math.floor(Math.random() * 101);

  return (
    <div className="rounded-2xl w-[28rem] p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 m-2">
      <div className="relative z-50">
        <div className="px-4 py-1">
          <Skeleton className="py-2 w-full h-64 rounded-xl" />

          <h2 className="mt-4 flex items-center gap-x-2">
            <Skeleton className="w-32 h-6 rounded-xl bg-dexter-green/55" />
            <Skeleton className="w-32 h-7 rounded-xl bg-dexter-gray/55" />
          </h2>

          <div className="text-stone-200/55 text-lg flex items-center mt-2">
            <span>Created by: account...</span>
            <Skeleton className="ms-2 w-24 h-4 rounded-xl bg-stone-400/55" />
          </div>

          <Skeleton className="my-2 w-full h-20 rounded-xl bg-stone-600/55" />

          <div className="flex items-center my-2">
            <h2 className="text-xl text-stone-200/55">Last Price:</h2>
            <div className="ms-auto flex items-center">
              <Skeleton className="w-12 h-4 rounded-xl bg-dexter-green/55" />
              <Skeleton className="ms-4 w-20 h-8 rounded-xl bg-dexter-gray-b/55" />
            </div>
          </div>

          <div className="flex items-center my-2">
            <h2 className="text-xl text-stone-200/55">Ready to DeXter:</h2>
            <div className="ms-auto flex items-center">
              <Skeleton className="w-16 h-4 rounded-xl bg-dexter-green/55" />
              <Skeleton className="ms-4 w-20 h-8 rounded-xl bg-dexter-gray-b/55" />
            </div>
          </div>

          <Skeleton className="w-full h-4 rounded-xl bg-dexter-gray-b/55">
            <Progress value={randomPercentage} className="h-4" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
