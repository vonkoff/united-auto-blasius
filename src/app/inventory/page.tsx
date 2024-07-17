import Link from "next/link";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Our Car Collection
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
              Browse through our diverse selection of the latest car models,
              each offering exceptional performance, style, and comfort.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Roadster</h3>
                  <p className="text-gray-500 dark:text-gray-400">$45,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Cruiser</h3>
                  <p className="text-gray-500 dark:text-gray-400">$39,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Sedan</h3>
                  <p className="text-gray-500 dark:text-gray-400">$29,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme SUV</h3>
                  <p className="text-gray-500 dark:text-gray-400">$49,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Hybrid</h3>
                  <p className="text-gray-500 dark:text-gray-400">$35,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Electric</h3>
                  <p className="text-gray-500 dark:text-gray-400">$55,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Convertible</h3>
                  <p className="text-gray-500 dark:text-gray-400">$49,999</p>
                </div>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="block" prefetch={false}>
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={300}
                  alt="Car Model"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold">Acme Minivan</h3>
                  <p className="text-gray-500 dark:text-gray-400">$32,999</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
