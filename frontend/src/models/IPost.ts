import type { ITableEntity } from '@/components/shared/table/TableView.model.ts';

export interface IPost extends ITableEntity {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}