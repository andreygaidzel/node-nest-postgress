
export const mapFilters = (filters: Record<string, string> | undefined) => {
  if (!filters) {
    return undefined;
  }
  const entries = Object.entries(filters);
  if (!entries.length) {
    return undefined;
  }

  let filterString = '';
  entries.forEach(([key, value]) => {
    if (filterString.length) {
      filterString += ';';
    }
    filterString += `${key}=${encodeURIComponent(value)}`;
  });

  return filterString;
}