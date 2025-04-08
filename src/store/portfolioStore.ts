import { atomWithReset } from "jotai/utils";

export const checkedPortfolioStore = atomWithReset<{
  checking: "none" | "hidden" | "fixed";
  initalChecked: string[];
  checkedPortfolios: string[];
}>({
  checking: "none",
  initalChecked: [],
  checkedPortfolios: [],
});
