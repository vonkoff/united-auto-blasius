// @ts-nocheck

// import InstantSearchWrapper from "../../components/InstantSearchWrapper";
import { Search } from "../../components/Search";
export const dynamic = "force-dynamic";
import { CarGurusScript } from "../_components/car-card";

export default function Page() {
  return (
    <>
      <CarGurusScript />
      <Search />
    </>
  );
}
