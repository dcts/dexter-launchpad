import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { TTokenData } from "@/types";

export const CoinCardDeprecated = ({ coin }: { coin: TTokenData }) => {
  const hasLastPrice = !!coin.lastPrice;

  return (
    <div className="rounded-2xl shadow-xl w-[285px] h-[450px] overflow-hidden bg-dexter-grey-dark border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 mx-auto">
      <div className="relative z-50 h-full flex flex-col">
        <div className="">
          <figure>
            <Image
              src={coin.iconUrl || ""}
              alt={coin.name || ""}
              width={175}
              height={175}
              className="object-cover w-full h-48 rounded-lg rounded-bl-none rounded-br-none"
            />
          </figure>

          <div className="flex-grow px-4">
            <h2 className="text-dexter-green max-sm:text-lg text-xl font-bold tracking-wide mt-4 flex items-center justify-between">
              <span className="inline-block text-dexter-green capitalize whitespace-nowrap max-w-32 truncate">
                {coin.name}
              </span>
              <span className="text-dexter-gray uppercase ms-2 max-w-44 truncate">
                (${coin.symbol})
              </span>
            </h2>

            <p className="text-stone-200 text-xs opacity-50">
              Created by: {coin.address.slice(0, 12)}...
            </p>

            <p className="mt-2 text-stone-400 tracking-wide leading-relaxed text-sm line-clamp-3">
              {coin.description}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2 px-4 pb-4">
          <div className="flex items-center my-2">
            <h2 className="text-base">Price:</h2>
            <div className="ms-auto">
              <span
                className={`ms-4 p-1 text-base ${
                  hasLastPrice ? "" : "opacity-50"
                }`}
              >
                {hasLastPrice ? coin.lastPrice?.toFixed(6) : "no trades"}
              </span>
            </div>
          </div>

          <div className="flex items-center my-2">
            <h2 className="text-base whitespace-nowrap">Sale progress:</h2>
            <div className="ms-auto">
              <span className="text-dexter-green whitespace-nowrap text-base">
                {((coin.xrdAmount || 0) / 1000).toFixed(0)}k /{" "}
                1000k XRD
              </span>
            </div>
          </div>

          <Progress value={(coin?.progress || 0) * 100} />
        </div>
      </div>
    </div>
  );
};

export const CoinCardDeprecatedSkeleton = () => {
  const randomPercentage = Math.floor(Math.random() * 101);

  return (
    <div className="rounded-2xl w-[22rem] h-[29rem] p-4 overflow-hidden bg-dexter-grey-dark border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 m-2">
      <div className="relative z-50">
        <div className="px-4 py-1">
          <Skeleton className="py-2 w-full h-44 rounded-lg bg-dexter-gray-b" />

          <h2 className="mt-4 flex items-center justify-between gap-x-2">
            <Skeleton className="w-28 h-6 rounded-xl bg-dexter-green/55" />
            <Skeleton className="w-20 h-7 rounded-xl bg-dexter-gray-b" />
          </h2>

          <div className="text-stone-200/55 flex items-center mt-2">
            <span>Created by: </span>
            <Skeleton className="ms-2 w-24 h-4 rounded-xl bg-dexter-gray-b" />
          </div>

          <Skeleton className="my-4 w-full h-14 rounded-xl bg-dexter-gray-b" />

          <div className="flex items-center my-2">
            <h2 className="max-sm:text-base text-lg text-stone-200/55">
              Price:
            </h2>
            <div className="ms-auto flex items-center">
              <Skeleton className="ms-4 w-20 h-8 rounded-xl bg-dexter-gray-b" />
            </div>
          </div>

          <div className="flex items-center my-2">
            <h2 className="max-sm:text-base text-lg text-stone-200/55 whitespace-nowrap">
              Sale progress:
            </h2>
            <div className="ms-auto flex items-center">
              <Skeleton className="w-12 h-4 rounded-xl bg-dexter-green/55" />
              <Skeleton className="ms-4 w-16 h-8 rounded-xl bg-dexter-gray-b" />
            </div>
          </div>

          <Skeleton className="w-full h-4 rounded-xl bg-dexter-gray-b">
            <Progress value={randomPercentage} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
