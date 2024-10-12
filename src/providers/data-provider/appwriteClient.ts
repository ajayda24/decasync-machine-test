import { Appwrite, Storage } from "@refinedev/appwrite";

const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "670944b500094e51dc3a";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for file upload
const storage = new Storage(appwriteClient);

export { appwriteClient, storage };
