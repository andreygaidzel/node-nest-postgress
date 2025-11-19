import { useAppDispatch } from '@/hooks/redux.ts';
import { useDebounce } from '@/utils/debounce.ts';
import type { IFetchTableParams, ISortModel } from '@/models/IFetchTableParams.ts';
import type {
  IFetchTableDataFn,
  IFilter,
  IPublicTableActions,
  ITableActions,
} from '@/components/shared/table/TableView.model.ts';

export function useTableFetch<T>(
  state: IFetchTableParams,
  useFetchQuery: IFetchTableDataFn<T>,
  sliceActions: ITableActions) {
  const dispatch = useAppDispatch();
  const { page, pageSize, sort, filter } = state;
  const debouncedFilter = useDebounce<IFilter>(filter, 500);
  const fetchResult = useFetchQuery({
    page,
    pageSize,
    sort,
    filter: debouncedFilter,
  });
  const { setSort, setPage, setPageSize, setFilter } = sliceActions;

  const actions: IPublicTableActions = {
    setSort: (sort: ISortModel) => dispatch(setSort(sort)),
    setPage: (page: number) => dispatch(setPage(page)),
    setFilter: (filter: IFilter) => dispatch(setFilter(filter)),
    setPageSize: (pageSize: number) => dispatch(setPageSize(pageSize)),
  }

  return { actions, fetchResult, state }
}