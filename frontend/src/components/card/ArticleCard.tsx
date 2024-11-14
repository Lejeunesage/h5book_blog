// components/card/ArticleCard.tsx
"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaBookmark, FaHeart, FaCommentAlt, FaShare, FaBookOpen, FaStar } from 'react-icons/fa';
import Comment from '../posts/Comment';
import CommentForm from '../posts/CommentForm';
import { Article } from '@/types';

// Fonction pour calculer le temps de lecture
const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200; 
  const wordCount = text.split(' ').length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
};

interface ArticleCardProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  liked: boolean;
  bookmarked: boolean;
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBookmark: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpenArticle, liked, bookmarked, onLike, onBookmark }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice Martin",
      content: "Super article ! Très instructif.",
      time: "Il y a 1h",
      replies: [
        {
          id: 2,
          author: "Bob Wilson",
          content: "Tout à fait d'accord avec toi Alice !",
          time: "Il y a 30min"
        }
      ]
    }
  ]);
  const [favorited, setFavorited] = useState(false);

  const handleAddComment = (content: any) => {
    const newComment = {
      id: comments.length + 1,
      author: "Utilisateur",
      content: content,
      time: "À l'instant",
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (commentId: number, content: any) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "Utilisateur",
              content: content,
              time: "À l'instant"
            }
          ]
        };
      }
      return comment;
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const readingTime = calculateReadingTime(article.content); 

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 hover:shadow-lg transition-shadow">
      <div
        className="cursor-pointer"
        onClick={() => onOpenArticle(article)}
      >
        {/* Affichage de la catégorie en haut */}
        <div className="text-sm text-white bg-blue-600 px-2 py-1 rounded mb-2 inline-block">
          {article.category}
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>Par : {article.author}</span>
          <span>•</span>
          <span>{article.time}</span>
          <span>•</span>
          <span>{readingTime} min de lecture</span> 
        </div>
        <div className="grid grid-cols-2 items-start justify-between gap-4">
          <div className="relative h-48 w-full overflow-hidden rounded">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <p className="text-gray-600 line-clamp-3">{article.summary}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          {article.tags?.map((tag) => (
            <button
              key={tag}
              className="border border-gray-400 text-gray-600 hover:bg-gray-100 px-2 py-1 text-sm rounded"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between border-t pt-4 mt-4">
        <div className="flex gap-4">
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              liked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(e);
            }}
          >
            <FaHeart className="h-4 w-4 mr-1" />
            {article.likes + (liked ? 1 : 0)}
          </button>
          <button
            className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            onClick={() => setShowComments(!showComments)}
          >
            <FaCommentAlt className="h-4 w-4 mr-1" />
            {article.commentCount}
          </button>
          {/* Bouton pour l'ajout aux favoris */}
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              favorited ? 'text-yellow-500' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setFavorited(!favorited);
            }}
          >
            <FaStar className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              bookmarked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(e);
            }}
          >
            <FaBookmark className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
            <FaShare className="h-4 w-4" />
          </button>
          <button
            onClick={() => onOpenArticle(article)}
            className="inline-flex items-center justify-center font-medium rounded px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
          >
            <FaBookOpen className="h-4 w-4 mr-1" />
            Lire
          </button>
        </div>
      </div>

      {/* Section commentaires */}
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <CommentForm onSubmit={handleAddComment} />
          
          <div className="mt-6">
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleAddReply}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
