"use client";
import algoliasearch from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBox, SortBy, Pagination, Configure } from "react-instantsearch";
import CustomHits from "../components/CustomHits"; // Make sure to use the correct path to your CustomHits component
//TODO: Use this below

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API!,
);

console.log(process.env.NEXT_PUBLIC_ALGOLIA_ID!);
console.log(process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API!);
console.log(process.env.NEXT_PUBLIC_ALGOLIA_DB);

export function Search() {
  return (
    <InstantSearchNext
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_DB}
      searchClient={searchClient}
      routing={{
        router: {
          cleanUrlOnDispose: false,
          windowTitle(routeState) {
            const indexState = routeState.indexName ?? {};
            return indexState.query
              ? `United Auto - Results for: ${indexState.query}`
              : "United Auto - Car Sales Inventory";
          },
        },
        stateMapping: {
          stateToRoute(uiState) {
            return {
              query: uiState.query,
              page: uiState.page,
            };
          },
          routeToState(routeState) {
            return {
              query: routeState.query,
              page: routeState.page,
            };
          },
        },
      }}
    >
      <Configure hitsPerPage={10} />
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Our Car Collection
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Browse through our diverse selection of the latest car models,
                each offering exceptional performance, style, and comfort.
              </p>
            </div>
            <SearchBox
              autoFocus
              placeholder="Search Inventory"
              classNames={{
                root: "w-full md:w-1/2 mt-4 mb-4",
                form: "relative",
                input:
                  " w-full pl-9 pr-3 py-2 bg-white border border-slate-400 placeholder-slate-500 font-semibold focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1",
                //TODO: Fix up below it goes all over
                submitIcon: "w-3.5 h-3.5 text-gray-400",
                submit: "absolute inset-y-0 left-0 flex items-center pl-3",

                resetIcon: "hidden",
              }}
            />
            {/* TODO: Add when working sort by */}
            {/* <div className="mb-4 mt-2 flex items-center gap-1"> */}
            {/*   <h1 className="font-semibold">Sort by:</h1> */}
            {/*   <SortBy */}
            {/*     classNames={{ */}
            {/*       select: */}
            {/*         "border border-gray-300 py-2 px-3 focus:outline-none focus:shadow-outline", */}
            {/*     }} */}
            {/*     defaultRefinement={process.env.NEXT_PUBLIC_ALGOLIA_DB!} */}
            {/*     items={[ */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}`, */}
            {/*         label: "Default", */}
            {/*       }, */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}_year_asc`, */}
            {/*         label: "Year Ascending", */}
            {/*       }, */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}_year_desc`, */}
            {/*         label: "Year Descending", */}
            {/*       }, */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}_price_asc`, */}
            {/*         label: "Price Ascending", */}
            {/*       }, */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}_price_desc`, */}
            {/*         label: "Price Descending", */}
            {/*       }, */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}_mileage_asc`, */}
            {/*         label: "Mileage Ascending", */}
            {/*       }, */}
            {/*       { */}
            {/*         value: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}_mileage_desc`, */}
            {/*         label: "Mileage Descending", */}
            {/*       }, */}
            {/*     ]} */}
            {/*   /> */}
            {/* </div> */}
            <CustomHits />
            {/* <Pagination /> */}
          </div>
        </div>
      </section>
    </InstantSearchNext>
  );
}
