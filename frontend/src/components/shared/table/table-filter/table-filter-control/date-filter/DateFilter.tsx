import { type IFilter } from '@/components/shared/table/TableView.model.ts';
import { Box, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect } from 'react';
import Close from '@mui/icons-material/Close';
import styles from './DateFilter.module.scss';

interface TableFilterControlProps {
  filterKey: string;
  filter: IFilter;
  onFilterChange: (key: string, value: (string | null)[] | null) => void;
}

const DateFilter = ({ filterKey, filter, onFilterChange: handleFilterChange }: TableFilterControlProps) => {
  const [from, to] = filter[filterKey]?.length ? filter[filterKey] : [null, null];
  const [startDate, setStartDate] = React.useState<Dayjs | null>(from ? dayjs(from) : null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(to ? dayjs(to) : null);

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);

    if (endDate && date && date.isAfter(endDate)) {
      setEndDate(null);
    }
  };

  const handleDateClear = () => {
    setEndDate(null);
    setStartDate(null);
    handleFilterChange(filterKey, null);
  }

  useEffect(() => {
    if (startDate && endDate) {
      handleFilterChange(filterKey, [startDate.toISOString(), endDate.toISOString()]);
    }
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className={styles.dateFilter}>
        <DatePicker
          label="Date From"
          value={startDate}
          onChange={handleStartDateChange}
        />

        <DatePicker
          label="Date To"
          value={endDate}
          minDate={startDate || undefined}
          onChange={setEndDate}
        />
        <IconButton
          color="error"
          onClick={handleDateClear}
          aria-label="delete"
        >
          <Close />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
}

export default DateFilter;