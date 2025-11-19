import { type IFilter, type IFilterParam, TableFilterType } from '@/components/shared/table/TableView.model.ts';
import TextFilter from '@/components/shared/table/table-filter/table-filter-control/text-filter/TextFilter.tsx';
import DateFilter from '@/components/shared/table/table-filter/table-filter-control/date-filter/DateFilter.tsx';

interface TableFilterControlProps {
  type: TableFilterType | undefined;
  filterKey: string;
  filter: IFilter;
  onFilterChange: (key: string, value: IFilterParam) => void;
}

const TableFilterControl = ({ type, filterKey, filter, onFilterChange: handleFilterChange }: TableFilterControlProps) => {
  switch (type) {
    case TableFilterType.TEXT:
      return (
        <TextFilter
          filterKey={filterKey}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
      );
    case TableFilterType.DATE:
      return (
       <DateFilter
         filterKey={filterKey}
         filter={filter}
         onFilterChange={handleFilterChange}
       />
      );
    default:
      return null;
  }
}

export default TableFilterControl;