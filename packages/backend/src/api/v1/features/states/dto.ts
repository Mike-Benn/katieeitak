export interface GetStatesSeenDto {
  userId: string;
}

export interface MarkStateSeenDto {
  stateId: number;
  userId: string;
}

export interface UnmarkStateSeenDto {
  stateId: string;
  userId: string;
}

export interface MarkCapitolSeenDto {
  stateId: number;
  userId: string;
}

export interface UnmarkCapitolSeenDto {
  stateId: string;
  userId: string;
}
