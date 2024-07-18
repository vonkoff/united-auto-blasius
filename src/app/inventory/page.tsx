import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { CarCard } from "../_components/car-card";

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

const removeHyphens = (item: InventoryItemProps): InventoryItemProps => {
  const updatedItem: InventoryItemProps = { ...item };

  (Object.keys(updatedItem) as (keyof InventoryItemProps)[]).forEach((key) => {
    if (typeof updatedItem[key] === "string") {
      //@ts-expect-error because
      updatedItem[key] = (updatedItem[key] as string).replace(/-/g, "");
    }
  });

  return updatedItem;
};

const getInventoryData = () => {
  const filePath = path.join(process.cwd(), "public", "inventorycars.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");
  //@ts-expect-error because
  const records: InventoryItemProps[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Parse the ImageURLs field as JSON and remove hyphens from strings
  records.forEach((record) => {
    if (typeof record.ImageURLs === "string") {
      record.ImageURLs = JSON.parse(record.ImageURLs);
    }
    Object.assign(record, removeHyphens(record));
  });

  return records;
};

export default function Home() {
  const items = getInventoryData();

  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800">
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
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <CarCard
                key={item.Stock}
                carJpg={item.ImageURLs[0].trim()} // Ensure the image filename is trimmed
                altText={`${item.Year} ${item.Make} ${item.Model}`}
                carTitle={`${item.Year} ${item.Make} ${item.Model}`}
                carPrice={item.Price}
                link={`/inventory/${encodeURIComponent(`${item.Make}-${item.Model}-${item.Stock}`)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
