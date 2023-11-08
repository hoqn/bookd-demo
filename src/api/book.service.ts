import ApiClient from "./core";
import { BookDetailResponse, BookSearchByTitleResponse } from "./types/book.res";

class BookService extends ApiClient {
  constructor() {
    super();
  }

  // @handleError
  public async searchByTitle(title: string, pageNo: number) {
    return this.baseClient
      .get<BookSearchByTitleResponse>(`/search/${title}/${pageNo}`)
      .then(res => res.data);
  }

  public async getBookDetail(isbn: string) {
    return this.baseClient
      .get<BookDetailResponse>(`/book/${isbn}`)
      .then(res => res.data);
  }
}

const bookService = new BookService();

export default bookService;