import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

// const tableauStock = writable([
//   {
//     id: "ll",
//     nom: 90,
//     montant: 88,
//   },
// ]);

export const tableauStock = [];

export const store = persistStore("data", tableauStock);
