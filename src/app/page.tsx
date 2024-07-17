import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import Image from "next/image";
import { MapPin, Clock10 } from "lucide-react";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="relative  sm:items-center sm:justify-center">
      <div className="relative">
        <div className="mx-auto">
          <div className="relative shadow-xl ">
            <div className="absolute inset-0">
              {/* <img */}
              {/*   src="https://di-uploads-development.dealerinspire.com/blasiuspreownedauto/uploads/2023/09/BLASIUS-PRE-OWNED.png" */}
              {/*   alt="" */}
              {/* /> */}
              <Image
                className="h-full w-full object-cover"
                src="/images/front-building-3.jpg"
                alt="Picture of a triangle"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-[color:rgba(30,23,38,0.5)] mix-blend-multiply" />
            </div>
            <div
              className="lg:pt-18 relative px-4 pb-8 pt-8 font-sans shadow-black drop-shadow-[2px_2px_var(--tw-shadow-color)] sm:px-6 sm:pb-14 sm:pt-16
                        lg:px-8 lg:pb-20"
            >
              <h1 className="text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                <span className="text-white">United Auto Sales & Service</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Where friends send friends
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto grid h-1/2 h-full max-h-fit grid-cols-1 items-center justify-center justify-items-start bg-black md:grid-cols-2 md:justify-items-center">
          <div className="mx-2 mb-3 flex flex-col justify-center gap-1 pl-4 text-white md:gap-4 md:pl-0">
            <h2 className="mb-1 mt-4 text-xl uppercase md:mx-auto lg:text-2xl">
              Get Directions
            </h2>
            <span className="my-2 flex items-center gap-2 text-sm font-light lg:text-base">
              <MapPin className="h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6" />
              219 Congress Ave, Waterbury, CT 06708
            </span>
            <span className="my-2 flex items-center gap-2 text-sm font-light lg:text-base">
              <Clock10 className="h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6" />{" "}
              <div className="flex flex-col">
                <p>Open Today! Sales: 9am-5pm</p>
                <p>Open Today! Service: 9am-5pm</p>
              </div>
            </span>
          </div>
          <img
            className="order-first max-h-64  w-full object-cover md:order-last"
            src="https://api.mapbox.com/styles/v1/di-sysops/cle6iyspk000301jvzavqrvjp/static/pin-l+1499CE(-73.4056293,41.4596462)/-73.4056293,41.4596462,10,0,0/343x450@2x?access_token=pk.eyJ1IjoiZGktc3lzb3BzIiwiYSI6ImNqMnJzNnRvYTAwOXkzMHBsamE1cTd0OGcifQ.qlCfteKKSMrHmHxG0jahxA"
          />
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  // const latestPost = await api.post.getLatest.query();
  //
  // return (
  //   <div className="w-full max-w-xs">
  //     {latestPost ? (
  //       <p className="truncate">Your most recent post: {latestPost.name}</p>
  //     ) : (
  //       <p>You have no posts yet.</p>
  //     )}
  //
  //     <CreatePost />
  //   </div>
  // );
}
