// components/card/ArticleModal.tsx
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaBookmark, FaHeart, FaCommentAlt, FaShare, FaTimes, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { Article, CommentType } from '@/types';

// Fonction pour calculer le temps de lecture
const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
};

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  comments: CommentType[];
  onAddComment: (content: string) => void;
  onAddReply: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  liked: boolean;
  onLike: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
  favorited: boolean;
  onFavorite: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  comments,
  onAddComment,
  onAddReply,
  onDeleteComment,
  liked,
  onLike,
  bookmarked,
  onBookmark,
  favorited,
  onFavorite,
}) => {

  // Désactiver le défilement du body lorsque la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Nettoyage du style lors de la fermeture ou du démontage du composant
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  if (!isOpen) return null;

  const readingTime = calculateReadingTime(article.summary);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 dark:text-gray-300 max-w-4xl shadow-2xl relative my-6 rounded-lg">
           {/* Close and Navigation buttons */}
           <div className="sticky top-0 p-5 flex justify-between bg-white dark:bg-gray-800  text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 w-full z-10 rounded-lg">
           <div className='flex gap-5'>
           <button
              onClick={onPrevious}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
           </div>

            <button
              onClick={onClose}
              className="p-2 bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 rounded-lg"
            >
              <FaTimes className="w-6 h-6" />
            </button>

          </div>

          {/* Article content */}
          <div className="p-6">
            <div className="text-sm text-white bg-blue-600 dark:bg-blue-500 px-2 py-1 rounded mb-2 inline-block">
              {article.category}
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <p className="font-medium">{article.author}</p>
                    <p className="text-sm">{article.time}</p>
                  </div>
                </div>
                <span>•</span>
                <div className="text-sm">
                  Temps de lecture : {readingTime} min
                </div>
              </div>

              <div className="relative w-full h-64 mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="prose max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {article.summary}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Categories, Tags, and Actions */}
              <div className="flex gap-4 mb-6">
                {article.categories?.map((category) => (
                  <button
                    key={category}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-800 px-2 py-1 text-sm rounded"
                  >
                    {category}
                  </button>
                ))}

                {article.tags?.map((tag) => (
                  <button
                    key={tag}
                    className="border border-gray-400 text-gray-600 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 px-2 py-1 text-sm rounded"
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Article actions */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t dark:border-gray-700">
                <div className="flex gap-4">
                  <button
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${liked ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-800' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                    onClick={onLike}
                  >
                    <FaHeart />
                    <span>{article.likes + (liked ? 1 : 0)}</span>
                  </button>

                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <FaCommentAlt />
                    <span>{comments.length}</span>
                  </button>

                  <button
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${favorited ? 'text-yellow-500' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                    onClick={onFavorite}
                  >
                    <FaStar />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`p-2 rounded-lg ${bookmarked ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-800' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                    onClick={onBookmark}
                  >
                    <FaBookmark />
                  </button>
                  <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="border-t pt-6 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Commentaires ({comments.length})</h2>
              <CommentForm onSubmit={onAddComment} />

              <div className="mt-6 space-y-6">
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={onAddReply}
                    onDelete={onDeleteComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ArticleModal;
