import { openDB } from "idb";

const initdb = async () =>
  openDB("feet", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("feet")) {
        console.log("feet database already exists");
        return;
      }
      db.createObjectStore("feet", { keyPath: "id", autoIncrement: true });
      console.log("feet database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post to the ase");

  // Create a connection to the database database and version we want to use.
  const feetDb = await openDB("feet", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = feetDb.transaction("feet", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("feet");

  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");

  // Create a connection to the database database and version we want to use.
  const feetDb = await openDB("feet", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = feetDb.transaction("feet", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("feet");

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
