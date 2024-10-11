import sitemap from "../app/sitemap";

const INDEXNOW_API_URL = "https://api.indexnow.org/indexnow";
const HOST = "www.unitedautowaterbury.com";
const KEY = "f26a6a3e4e1241259874f67a3f1c63fb";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function submitToIndexNow(): Promise<void> {
  try {
    const urls = await sitemap();

    const urlList = urls.map((entry) => entry.url);

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    const response = await fetch(INDEXNOW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`IndexNow submission status: ${response.status}`);
    } else {
      console.error(`Error submitting to IndexNow: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error);
  }
}

submitToIndexNow();
