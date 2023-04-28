import { API_URL } from '@/shared/config';
import { ApiResponse } from '@/shared/models/response.model';
import { TableCommand, TableModel } from '@/shared/models/table.model';
import axios from 'axios';

export const getTablesBackend = async () => {
  const response = await axios.get(`${API_URL}/tables`);
  return response.data as ApiResponse<TableModel>;
};

export const createTableBackend = async (table: TableCommand) => {
  const response = await axios.post(`${API_URL}/tables`, table);
  return response.data as TableModel;
};

export const updateTableBackend = async (id: number, table: TableCommand) => {
  const response = await axios.put(`${API_URL}/tables/${id}`, table);
  return response.data as TableModel;
};

export const deleteTableBackend = async (id: number) => {
  const response = await axios.delete(`${API_URL}/tables/${id}`);
  return response.data;
};
