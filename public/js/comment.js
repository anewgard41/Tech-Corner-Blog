// grabs values for post id and body, fetches request to api/posts, and posts the comment.

const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#post-id').value.trim();
    const body = document.querySelector('#comment-body').value.trim();

    if (body) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
}

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);

// grabs values for comment id, fetches request to api/comments, and deletes the comment.

const deleteCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }
    }
};

document
    .querySelector('.comment-list')
    .addEventListener('click', deleteCommentHandler);

    