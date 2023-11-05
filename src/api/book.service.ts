import ApiClient from "./core";

interface BookSearchByTitleResponse {
  "response": {
    "request": {
      "pageNo": number,
      "pageSize": number,
      "title": string,
    },
    "docs": {
      "doc": {
        "publication_year": string,
        "vol": string[],
        "bookImageURL": string,
        "isbn13": string,
        "publisher": string,
        "bookDtlUrl": string,
        "loan_count": number,
        "bookname": string,
        "authors": string,
      }[] | {
        "publication_year": string,
        "vol": string[],
        "bookImageURL": string,
        "isbn13": string,
        "publisher": string,
        "bookDtlUrl": string,
        "loan_count": number,
        "bookname": string,
        "authors": string,
      }
    } | "",
    "numFound": number,
  }
}

class BookService extends ApiClient {
  constructor() {
    super();
  }

  public async searchByTitle(title: string) {
    return this.baseClient
      .get<BookSearchByTitleResponse>(`/search/${title}`)
      .then(res => res.data);
  }
}

const bookService = new BookService();

export default bookService;