import { useState } from 'react';
import { FaReply, FaTrash } from "react-icons/fa";
import CommentForm from './CommentForm';
import { CommentType } from '@/types';

interface CommentProps {
  comment: CommentType;
  onReply: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, onDelete }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-gray-800 dark:text-white">{comment.author}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.time}</span>
            </div>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-1 ml-2">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 flex items-center gap-1"
            >
              <FaReply className="w-3 h-3" />
              Répondre
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 flex items-center gap-1"
              >
                <FaTrash className="w-3 h-3" />
                Supprimer
              </button>
            )}
          </div>

          {showReplyForm && (
            <CommentForm
              onSubmit={(content) => {
                onReply(comment.id, content);
                setShowReplyForm(false);
              }}
              placeholder="Écrire une réponse..."
              isReply={true}
            />
          )}

          {/* Réponses aux commentaires */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-8 space-y-4 mt-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-800 dark:text-white">{reply.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{reply.time}</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
