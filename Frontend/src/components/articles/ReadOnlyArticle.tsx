import React from "react";
import {
  ArticleText,
  ArticleFAQ,
  ArticleLink,
  ArticleMedia,
  ArticleUnion,
} from "../../types/articles";
import MediaImage from "../articles/MediaImage";

// ReadOnlyArticle – jednoduchá komponenta pro výpis článku (read-only)
const ReadOnlyArticle: React.FC<{ article: ArticleUnion }> = ({ article }) => {
  switch (article.type) {
    case "text":
      return <div dangerouslySetInnerHTML={{ __html: (article as ArticleText).content }} />;
    case "faq":
      return (
        <div>
          <p><strong>Otázka:</strong> {(article as ArticleFAQ).question}</p>
          <p><strong>Odpověď:</strong> {(article as ArticleFAQ).answer}</p>
        </div>
      );
    case "link":
      return (
        <div>
          <p>
            <a href={(article as ArticleLink).url} target="_blank" rel="noreferrer">
              {(article as ArticleLink).url}
            </a>
          </p>
          {(article as ArticleLink).placeholder && <p>{(article as ArticleLink).placeholder}</p>}
        </div>
      );
    case "media":
      return (
        <div>
          <p>{(article as ArticleMedia).description}</p>
          {(article as ArticleMedia).fileInformationsId && (
            <MediaImage
              fileId={(article as ArticleMedia).fileInformationsId!}
              alt={(article as ArticleMedia).alt || "Media image"}
            />
          )}
        </div>
      );
    default:
      return <div>Neznámý typ článku.</div>;
  }
};
export default ReadOnlyArticle;
