import { FormData } from 'snakicz-types';
export type FormType = Omit<FormData, 'orderNumber' | 'catPic'> & { file?: File };
