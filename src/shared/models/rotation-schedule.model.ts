import { Nullable } from '../utils';

export interface RotationScheduleTimeSlotResponse {
  tableNameOrBreak: string;
  slotName: string;
}

export interface GamePresenterTableResponse {
  gamePresenterName: string;
  tableTimeSlots: RotationScheduleTimeSlotResponse[];
}

export interface RotationScheduleResponse {
  id: string;
  date: string;
  gamePresenterTables: GamePresenterTableResponse[];
}
