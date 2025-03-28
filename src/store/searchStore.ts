import { atomWithReset } from "jotai/utils";

export type SearchType = { name: string; instagram: string; password: string };

export const searchStore = atomWithReset<SearchType>({
  name: "",
  instagram: "",
  password: "",
});
