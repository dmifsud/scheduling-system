import { Nullable } from '../utils';

export interface RotationScheduleTimeSlotDB {
  slotName: string;
  tableId: Nullable<string>;
  isBreak: boolean;
}

export interface GamePresenterTableDB {
  gamePresenterId: string;
  timeSlots: RotationScheduleTimeSlotDB[];
}

export interface RotationScheduleDB {
  id: string;
  gamePresenterTables: GamePresenterTableDB[];
}

export interface RotationScheduleTimeSlotResponse
  extends RotationScheduleTimeSlotDB {
  tableName: string;
}

export interface GamePresenterTableResponse extends GamePresenterTableDB {
  gamePresenterName: string;
  gamePresenterTables: RotationScheduleTimeSlotResponse[];
}

export interface RotationScheduleResponse {
  id: string;
  gamePresenterTables: GamePresenterTableResponse[];
}
