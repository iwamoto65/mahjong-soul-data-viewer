interface Character {
  charid: number;
  level: number;
  exp: number;
  skin: number;
  is_upgraded: boolean;
  extra_emoji: number[];
}

interface Level {
  id: number;
  score: number;
}

interface View {
  slot: number;
  item_id: number;
}

export interface UserAccount {
  account_id: number;
  seat: number;
  nickname: string;
  avatar_id: number;
  character: Character;
  title: number;
  level: Level;
  level3: Level;
  avatar_frame: number;
  verified: number;
  views: View[];
}
