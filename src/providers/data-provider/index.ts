import { dataProvider as DataProvider } from "@refinedev/appwrite";
import { appwriteClient } from "./appwriteClient";

export const dataProvider = DataProvider(appwriteClient, {
  databaseId: "67094545000378c4c7a8",
});
