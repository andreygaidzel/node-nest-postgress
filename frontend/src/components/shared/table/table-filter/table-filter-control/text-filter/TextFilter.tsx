import { type IFilter } from '@/components/shared/table/TableView.model.ts';
import { TextField } from '@mui/material';
import styles from './TextFilter.module.scss';

interface TableFilterControlProps {
  filterKey: string;
  filter: IFilter;
  onFilterChange: (key: string, value: string | null) => void;
}

const TextFilter = ({ filterKey, filter, onFilterChange: handleFilterChange }: TableFilterControlProps) => {
  return (
    <div className={styles.textField}>
      <TextField
        fullWidth
        label={`Filter by ${filterKey}`}
        variant="outlined"
        size="small"
        value={filter[filterKey]}
        onChange={(e) => handleFilterChange(filterKey, e.target.value)}
      />
    </div>
  );
}

export default TextFilter;