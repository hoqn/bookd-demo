export interface BookSearchByTitleResponse {
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

export interface BookDetailResponse {
  "response": {
    "request": {
      "isbn13": string
    },
    "detail": [
      {
        "book": {
          "no": number,
          "bookname": string,
          "publication_date": string,
          "authors": string,
          "publisher": string,
          "class_no": string,
          "class_nm": string,
          "publication_year": string,
          "bookImageURL": string,
          "isbn": string,
          "isbn13": string,
          "description": string,
        }
      }
    ]
  }
}