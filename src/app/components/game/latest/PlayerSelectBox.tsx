import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SeatIndex, Player } from "@/types/playerData";
import PersonIcon from "@mui/icons-material/Person";

interface FormInput {
  seat: SeatIndex;
}

interface PlayerSelectBoxProps {
  register: UseFormRegister<FormInput>;
  setValue: UseFormSetValue<FormInput>;
  handleSubmit: () => void;
  players: Player[];
}

export const GameLatestPlayerSelectBox: React.FC<PlayerSelectBoxProps> = ({ register, setValue, handleSubmit, players }): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("seat", Number(e.target.value) as SeatIndex);
    handleSubmit();
  };

  return (
    <div className="relative inline-block w-56">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <PersonIcon className="text-gray-500" />
      </div>
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-8 rounded-md leading-tight focus:outline-none"
        {...register("seat")}
        onChange={handleChange}
      >
        {players.map((player) => (
          <option key={player.seat} value={player.seat}>
            {player.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};
