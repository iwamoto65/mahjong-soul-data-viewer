import { useState } from "react";
import { setField } from './../../../../utils/state';

export interface ModeState {
  type: string;
  room: string;
  format: string;
  people: number;
};

export const useModeState = () => {
  const [modeState, setModeState] = useState<ModeState>({
    type: "",
    room: "",
    format: "",
    people: 0,
  });

  const setModeField = (field: keyof ModeState, value: string | number) => setField(setModeState, field, value);

  return { modeState, setModeField }
}
