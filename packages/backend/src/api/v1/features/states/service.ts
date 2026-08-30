import type {
  GetStatesSeenDto,
  MarkCapitolSeenDto,
  MarkStateSeenDto,
  UnmarkCapitolSeenDto,
  UnmarkStateSeenDto,
} from '@/api/v1/features/states/dto.js';
import type { StateRepository } from '@/api/v1/features/states/repository.js';

interface GetStatesSeenParams {
  data: GetStatesSeenDto;
}

interface MarkStateSeenParams {
  data: MarkStateSeenDto;
}

interface UnmarkStateSeenParams {
  data: UnmarkStateSeenDto;
}

interface MarkCapitolSeenParams {
  data: MarkCapitolSeenDto;
}

interface UnmarkCapitolSeenParams {
  data: UnmarkCapitolSeenDto;
}

export class StateService {
  private stateRepository: StateRepository;
  constructor(stateRepository: StateRepository) {
    this.stateRepository = stateRepository;
  }

  public getStatesSeen = async ({ data }: GetStatesSeenParams) => {
    const stateList = await this.stateRepository.getStatesSeen({ userId: data.userId });
    return stateList;
  };

  public markStateSeen = async ({ data }: MarkStateSeenParams) => {
    const markedState = await this.stateRepository.markStateSeen({
      stateId: data.stateId,
      userId: data.userId,
    });
    return markedState;
  };

  public unmarkStateSeen = async ({ data }: UnmarkStateSeenParams) => {
    const unmarkedState = await this.stateRepository.unmarkStateSeen({
      stateId: data.stateId,
      userId: data.userId,
    });
    return unmarkedState;
  };

  public markCapitolSeen = async ({ data }: MarkCapitolSeenParams) => {
    const markedCapitolState = await this.stateRepository.markCapitolSeen({
      stateId: data.stateId,
      userId: data.userId,
    });
    return markedCapitolState;
  };

  public unmarkCapitolSeen = async ({ data }: UnmarkCapitolSeenParams) => {
    const unmarkedCapitolState = await this.stateRepository.unmarkCapitolSeen({
      stateId: data.stateId,
      userId: data.userId,
    });

    return unmarkedCapitolState;
  };
}
