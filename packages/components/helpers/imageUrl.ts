/**
 * Build the full URL of an illustration from the filename the API returns.
 * Returns `undefined` when there is no filename, so it can be passed straight to an optional `src`/`imageSrc` prop.
 */
export const getImageUrl = (
  fileName: string | null | undefined,
  baseUrl: string,
): string | undefined => {
  if (!fileName) return undefined;
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(encodeURIComponent(fileName), base).toString();
};
