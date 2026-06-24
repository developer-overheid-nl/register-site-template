/**
 * @file This file is a helper file to aid with the dingen-api.
 * It should not be needed if used with a don-*-api, but if your api is different you might need similiar helpers.
 */

import type { FilterData } from "@developer-overheid-nl/don-register-components";

/** Capitalize character at index */
const capitalizeCharAt = (str: string, at = 0): string =>
  str.slice(0, at) + str.charAt(at).toUpperCase() + str.slice(at + 1);

/** Remove empty records from object */
export const removeEmptyValues = (
  obj: Record<string, string | string[] | number>,
): Record<string, string | string[] | number> => {
  const newObj: Record<string, string | string[] | number> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== "" && !(Array.isArray(value) && value.length === 0)) {
      newObj[key] = value;
    }
  }
  return newObj;
};

export const parseTags = (
  tags?: Record<string, number> | null,
  queryObject?: Record<string, string | string[]>,
): FilterData | [] => {
  if (!tags) return [];

  const filterkey = "tags_like";

  const options = Object.entries(tags).map(([key, value]) => ({
    value: key,
    label: capitalizeCharAt(key),
    count: value,
    selected: queryObject?.[filterkey]?.includes(key),
  }));

  return {
    key: "tags_like",
    label: "Tags",
    description: "Filter op tags",
    type: "multi-select" as FilterData["type"],
    options,
  };
};

export const parseCategories = (
  categories?:
    | { id: number; name: string; description: string; amount?: number }[]
    | null,
  queryObject?: Record<string, string | string[]>,
): FilterData | [] => {
  if (!categories) return [];

  const filterkey = "category";

  const options = categories.map(({ name, description, amount }) => ({
    value: name,
    label: name,
    description,
    count: Number(amount),
    selected: queryObject && queryObject[filterkey] === name,
  }));

  return {
    key: filterkey,
    label: "Categorieën",
    description: "Filter op categorieën",
    type: "single-select" as FilterData["type"],
    options,
  };
};
