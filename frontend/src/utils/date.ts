import dayjs from 'dayjs';
import { viewDateFormat } from '@/shared/constants/baseConfig.ts';

export const formatDate = (date: string, format: string = viewDateFormat) => date && dayjs(date).format(format);