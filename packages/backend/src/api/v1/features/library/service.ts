import type { LibraryRepository } from '@/api/v1/features/library/repository.js';
import type { MarkedBookReadPayload } from '@katieeitak/shared';

interface MarkBookReadParams {
  markedBookPayload: MarkedBookReadPayload;
  user_id: string;
}

interface GetReadBookParams {
  user_id: string;
  ol_book_key: string;
}

export class LibraryService {
  private libraryRepository: LibraryRepository;
  constructor(libraryRepository: LibraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  public markBookRead = async ({ markedBookPayload, user_id }: MarkBookReadParams) => {
    const markedBook = await this.libraryRepository.markBookRead({ markedBookPayload, user_id });
    return markedBook;
  };

  public getMarkedBook = async ({ user_id, ol_book_key }: GetReadBookParams) => {
    const markedBook = await this.libraryRepository.getMarkedBook({ user_id, ol_book_key });
    console.log(markedBook);
    return markedBook;
  };
}
