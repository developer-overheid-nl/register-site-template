import parseLinkHeader from "parse-link-header";
import type { PaginationProps } from "@developer-overheid-nl/don-register-components";
import type { paginationHeaders } from "@developer-overheid-nl/don-register-layouts"

const PAGE = "_page";
const LIMIT = "_limit";

export const parseHeaders = (headers: Headers) => {
  const links = parseLinkHeader(headers.get("link"));

  const pagination = <paginationHeaders>{
    currentPage: links?.prev ? Number(links.prev[PAGE]) + 1 : 1,
    perPage: Number(links?.first[LIMIT] || 10), 
    totalCount: Number(
      headers.get("x-total-count"),
    ),
    totalPages: Number(
      Number(links?.last[PAGE]) || 1
    ),
    ...links,
  };

  return pagination;
};

export const getPagination = (
  pagination: paginationHeaders | null | undefined,
  url: URL,
): PaginationProps => {
  if (!pagination) {
    return {
      links: [],
    };
  }

  const prev =
    pagination.prev !== undefined && pagination.last !== undefined
      ? new URL(
          `./${
            Number(pagination.prev[PAGE]) < pagination.totalPages
              ? pagination.prev[PAGE]
              : pagination.last[PAGE]
          }${url.search}`,
          url,
        ).toString()
      : undefined;
  const next =
    pagination.next !== undefined &&
    new URL(
      `./${pagination.next[PAGE]}${url.search}`,
      url,
    ).toString();

  const rangeBegin = (pagination.currentPage - 1) * pagination.perPage + 1;
  const rangeEnd = pagination.currentPage * pagination.perPage;

  return {
    links: [
      {
        href: new URL(
          `./${pagination.currentPage}${decodeURIComponent(url.search)}`,
          url,
        ).toString(),
        label: pagination.currentPage || 0,
        range: [
          rangeBegin,
          rangeEnd > pagination.totalCount ? pagination.totalCount : rangeEnd,
        ],
      },
    ],
    current: 0,
    prev,
    next,
  };
};
