import { type ITableView, TableFilterType } from '@/components/shared/table/TableView.model.ts';
import { Box, Tooltip } from '@mui/material';
import { baseUrl } from '@/shared/constants/baseConfig.ts';

export const POSTS_TABLE_MODEL: ITableView = {
  columns: [
    {
      columnKey: 'image',
      header: 'Image',
      templateFn: (column, item) => (
        <Box
          component="img"
          src={`${baseUrl}/${item[column.columnKey]}`}
          alt={item[column.columnKey]}
          sx={{
            width: 90,
            height: 90,
            borderRadius: 2,
            objectFit: 'cover',
            boxShadow: 1,
          }}
        />
      )
    },
    {
      columnKey: 'title',
      header: 'Title',
      isSort: true,
      isFilter: true,
      type: TableFilterType.TEXT,
      sx: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: "default", maxWidth: '200px' },
      templateFn: (column, item) => (
        <Tooltip title={item[column.columnKey]}>
          <span>{item[column.columnKey]}</span>
        </Tooltip>
      )
    },
    {
      columnKey: 'content',
      header: 'Content',
      isSort: true,
      isFilter: true,
      type: TableFilterType.TEXT,
    },
    {
      columnKey: 'createdAt',
      header: 'Created At',
      align: 'center',
      isSort: true,
      isFilter: true,
      type: TableFilterType.DATE,
      sx: { whiteSpace: 'nowrap' }
    },
    {
      columnKey: 'updatedAt',
      header: 'Updated At',
      align: 'center',
      isSort: true,
      isFilter: true,
      type: TableFilterType.DATE,
      sx: { whiteSpace: 'nowrap' }
    }
  ]
};