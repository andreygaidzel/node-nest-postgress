import type { IFilter } from '@/components/shared/table/TableView.model.ts';

export const mapFilters = (filters: IFilter | undefined) => {
  if (!filters) {
    return undefined;
  }
  const entries = Object.entries(filters);
  if (!entries.length) {
    return undefined;
  }

  if (entries.every(([, value]) => !value)) {
    return undefined;
  }

  let filterString = '';
  entries.forEach(([key, value]) => {
    if (filterString.length) {
      filterString += ';';
    }
    if (Array.isArray(value)) {
      const [from, to] = value;
      if (from && to) {
        filterString += `${key}*gte=${encodeURIComponent(from)};${key}*lte=${encodeURIComponent(to)}`;
      }
    } else {
      filterString += `${key}=${value && encodeURIComponent(value)}`;
    }
  });

  return filterString;
}