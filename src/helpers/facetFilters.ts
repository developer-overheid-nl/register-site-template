import type { FilterData } from "@developer-overheid-nl/don-register-components";

/** Capitalize character at index */
const capitalizeCharAt = (str: string, at = 0): string => (
  str.slice(0, at) + str.charAt(at).toUpperCase() + str.slice(at + 1)
)

export const parseTags = (tags: Record<string, number>): FilterData => {
  const options = Object.entries(tags).map(([key, value]) => ({
    value: key,
    label: capitalizeCharAt(key),
    count: value,
    selected: false,
  }));

  return {
    key: "tags_like",
    label: "Tags",
    description: "Filter op tags",
    type: "multi-select" as FilterData["type"],
    options,
  };
}

export const parseCategories = (categories?: {id: number, name: string, description: string, amount?: number}[]): FilterData | [] => {
  if (!categories) return [];
  
  const options = categories.map(({name, description, amount}) => ({
    value: name,
    label: name,
    description,
    count: Number(amount),
    selected: false,
  }));

  return {
    key: "category",
    label: "Categorieën",
    description: "Filter op categorieën",
    type: "single-select" as FilterData["type"],
    options,
  };
}
