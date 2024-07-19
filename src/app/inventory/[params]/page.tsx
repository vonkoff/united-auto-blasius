// @ts-nocheck
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import Image from "next/image";
import CarCarousel from "~/app/_components/car-carousel";

interface InventoryItemProps {
  Stock: string;
  Year: string;
  Make: string;
  Model: string;
  Color: string;
  Mileage: string;
  Price: string;
  ImageURLs: string[];
}

interface InventoryPageProps {
  params: {
    params: string;
  };
}

const removeHyphens = (item: InventoryItemProps): InventoryItemProps => {
  const updatedItem: InventoryItemProps = { ...item };

  (Object.keys(updatedItem) as (keyof InventoryItemProps)[]).forEach((key) => {
    if (typeof updatedItem[key] === "string") {
      updatedItem[key] = (updatedItem[key] as string).replace(/-/g, "");
    }
  });

  return updatedItem;
};

const getInventoryData = () => {
  const filePath = path.join(process.cwd(), "public", "inventorycars.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const records: InventoryItemProps[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Parse the ImageURLs field as JSON
  records.forEach((record) => {
    if (typeof record.ImageURLs === "string") {
      record.ImageURLs = JSON.parse(record.ImageURLs);
    }
    Object.assign(record, removeHyphens(record));
  });

  return records;
};

export async function generateStaticParams() {
  const items = getInventoryData();

  return items.map((item) => ({
    params: encodeURIComponent(
      `${item.Make}-${item.Model.replace(/\s+/g, "-")}-${item.Stock}`,
    ),
  }));
}

const InventoryItemPage = ({ params }: InventoryPageProps) => {
  const decodedParams = decodeURIComponent(params.params);
  const paramsArray = decodedParams.split("-");
  const make = paramsArray[0];
  const stock = paramsArray[paramsArray.length - 1];
  const model = paramsArray.slice(1, -1).join(" ");

  console.log(`Decoded Params: ${decodedParams}`);
  console.log(`Make: ${make}, Model: ${model}, Stock: ${stock}`);

  const items = getInventoryData();
  console.log(`Items: ${JSON.stringify(items, null, 2)}`);

  const item = items.find(
    (i) =>
      i.Make.toLowerCase() === make.toLowerCase() &&
      i.Model.toLowerCase() === model.toLowerCase() &&
      i.Stock === stock,
  );

  console.log(`Found Item: ${JSON.stringify(item, null, 2)}`);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>My page title</title>
        <Partytown debug={true} forward={["dataLayer.push"]} />
        <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-97NZCPR2KD"></script>
        <script type="text/partytown">
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-97NZCPR2KD');
        </script>      
      </Head>
      <CarCarousel item={item} />
      <Card className="rounded-lg bg-white shadow-md">
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="font-medium">Exterior:</span>
              <span>{item.Color}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Mileage:</span>
              <span>{item.Mileage}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Year:</span>
              <span>{item.Year}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Make:</span>
              <span>{item.Make}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Model:</span>
              <span>{item.Model}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Price:</span>
              <span>{item.Price}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryItemPage;
