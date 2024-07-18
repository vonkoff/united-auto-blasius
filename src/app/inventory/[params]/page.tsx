// @ts-nocheck
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "~/components/extensions/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import Carouselother from "~/components/extensions/carouselother";

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

  const CarouselOrientation = () => {
    return (
      <Carousel>
        <CarouselMainContainer className="h-60">
          {item.ImageURLs.map((url, index) => (
            <SliderMainItem key={index} className="bg-transparent">
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={`/images/cars/${url}`}
                  alt={`Slide ${index + 1}`}
                  className="max-h-full max-w-full rounded-xl object-contain"
                />
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer>
          {item.ImageURLs.map((url, index) => (
            <SliderThumbItem
              key={index}
              index={index}
              className="bg-transparent"
            >
              <div className="  ">
                <img
                  src={`/images/cars/${url}`}
                  alt={`Slide ${index + 1}`}
                  className=" rounded-xl object-contain"
                />
              </div>
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex">
        <Carouselother images={item.ImageURLs} />
        {/* <CarouselOrientation /> */}
      </div>
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
