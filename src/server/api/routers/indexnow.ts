// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/non-nullable-type-assertion-style */
import { publicProcedure, createTRPCRouter } from "~/server/api/trpc";
import sitemap from "~/app/sitemap";

export const indexNowRouter = createTRPCRouter({
  triggerIndexNow: publicProcedure.mutation(async ({ ctx }) => {
    const INDEXNOW_API_URL = "https://api.indexnow.org/indexnow";
    const HOST = "www.example.org";
    const KEY = "f34f184d10c049ef99aa7637cdc4ef04";
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
        throw new Error(`Error triggering IndexNow: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error triggering IndexNow:", error);
      throw new Error("IndexNow submission failed");
    }
  }),
});
