import { atomWithReset } from "jotai/utils";

export const checkedPortfolioStore = atomWithReset<{
  checking: "none" | "hidden" | "fixed";
  initialChecked: string[];
  checkedPortfolios: string[];
}>({
  checking: "none",
  initialChecked: [],
  checkedPortfolios: [],
});
