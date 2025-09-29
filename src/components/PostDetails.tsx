import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  openedPost: Post;
  loading: boolean;
  errorMessage: string | null;
  openForm: boolean;
  setOpenForm: (value: boolean) => void;
  addCommentHandler: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
  deleteTodoHandler: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  openedPost,
  loading,
  errorMessage,
  openForm,
  setOpenForm,
  addCommentHandler,
  deleteTodoHandler,
}) => {
  const deleteBtnHandler = async (id: number) => {
    deleteTodoHandler(id);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${openedPost.id}: ${openedPost.title}`}
          </h2>

          <p data-cy="PostBody">{openedPost.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loading && !errorMessage && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!loading && !errorMessage && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteBtnHandler(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!openForm && !loading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openForm && (
          <NewCommentForm
            openedPost={openedPost}
            loading={loading}
            addCommentHandler={addCommentHandler}
          />
        )}
      </div>
    </div>
  );
};
