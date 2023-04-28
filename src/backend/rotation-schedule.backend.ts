import { API_URL } from '@/shared/config';

import { ApiResponse } from '@/shared/models/response.model';
import { RotationScheduleDB } from '@/shared/models/rotation-schedule.model';
import axios from 'axios';

export const getRotationSchedule = async () => {
  const response = await axios.get(`${API_URL}/rotation-schedule`);
  return response.data as ApiResponse<RotationScheduleDB>;
};
