export type ArticleType = "text" | "faq" | "link" | "media";

export interface Article {
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
  file: File | null;
  description?: string;
  alt?: string;
}

