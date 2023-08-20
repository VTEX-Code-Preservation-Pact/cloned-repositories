/**
 * This utility function checks that we have at least one
 * of the SearchParams available.
 * `query` is needed for the search page.
 * `selectedFacets` array is needed for the category page.
 *
 * @param args object passed by the search resolver
 * @returns boolean
 */
export const validateArgs = (args: SearchParams) => {
  const { query, selectedFacets } = args

  return !(!query && !selectedFacets?.length)
}
