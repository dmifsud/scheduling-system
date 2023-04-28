import { API_URL } from '@/shared/config';

import { ApiResponse } from '@/shared/models/response.model';
import { RotationScheduleResponse } from '@/shared/models/rotation-schedule.model';
import axios from 'axios';

export const getRotationSchedules = async () => {
  const response = await axios.get(`${API_URL}/rotation-schedule`); // TODO: add query to get specific day schedule
  return response.data as ApiResponse<RotationScheduleResponse>;
};
