//TODO: Remove later if everything working
// "use client";
//
// import { InstantSearchNext } from "react-instantsearch-nextjs";
// import { useEffect, useState } from "react";
// import algoliasearch from "algoliasearch/lite";
//
// const searchClient = algoliasearch(
//   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
//   process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
// );
//
// const InstantSearchWrapper = ({ children }) => {
//   const [isClient, setIsClient] = useState(false);
//
//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//
//   return (
//     <InstantSearchNext
//       indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}
//       searchClient={searchClient}
//     >
//       {isClient && children}
//     </InstantSearchNext>
//   );
// };
//
// export default InstantSearchWrapper;
