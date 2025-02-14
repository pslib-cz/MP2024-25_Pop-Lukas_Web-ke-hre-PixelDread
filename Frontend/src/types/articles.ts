export type ArticleType = "text" | "faq" | "link" | "media";

export interface Article {
  id: number;        // přidané – identifikátor článku
  postId: number;    // přidané – odkaz na příspěvek, ke kterému článek patří
  type: ArticleType;
  order: number;
}

export interface ArticleText extends Article {
  type: "text";
  content: string;
}

export interface ArticleFAQ extends Article {
  type: "faq";
  question: string;
  answer: string;
}

export interface ArticleLink extends Article {
  type: "link";
  url: string;
  placeholder?: string;
}

export interface ArticleMedia extends Article {
  type: "media";
  file?: File;
  fileInformationsId?: number;
  description?: string;
  alt?: string;
}

export type ArticleUnion = ArticleText | ArticleFAQ | ArticleLink | ArticleMedia;
