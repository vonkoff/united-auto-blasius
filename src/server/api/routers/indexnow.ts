import { publicProcedure, createTRPCRouter } from "~/server/api/trpc";
import sitemap from "~/app/sitemap";

export const indexNowRouter = createTRPCRouter({
  triggerIndexNow: publicProcedure.mutation(async ({ ctx }) => {
    const INDEXNOW_API_URL = "https://api.indexnow.org/indexnow";
    const HOST = "unitedautowaterbury.com";
    const KEY = "f26a6a3e4e1241259874f67a3f1c63fb";
    const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

    try {
      const sitemapEntries = await sitemap();
      const urlsToIndex = sitemapEntries.map((entry) => entry.url);

      const payload = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlsToIndex,
      };

      console.log(urlsToIndex);

      const response = await fetch(INDEXNOW_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("IndexNow submission successful:", urlsToIndex);
        return {
          status: response.status,
          message: "IndexNow triggered successfully",
          submittedUrls: urlsToIndex,
        };
      } else {
        const statusText = await response.text();
        throw new Error(`Error triggering IndexNow: ${statusText}`);
      }
    } catch (error) {
      console.error("Error triggering IndexNow:", error);
      throw new Error("IndexNow submission failed");
    }
  }),
});
