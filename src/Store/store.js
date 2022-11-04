import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

export const tableauStock = [];

export const store = persistStore("data", tableauStock);
