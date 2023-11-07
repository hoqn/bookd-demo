export interface UserBookDto {
  memberId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  isbn: string;
}

export interface UserScrapDto {
  bookDiaryId: number;
  content: string;
  memo: string;
}
