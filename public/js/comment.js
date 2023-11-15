// grabs values for post id and body, fetches request to api/posts, and posts the comment.

const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#post-id').value.trim();
    const body = document.querySelector('#comment-body').value.trim();

    if (body) {
        const response = await fetch('/api/comment', {
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

document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector('.comment-form')
        .addEventListener('submit', commentFormHandler);
});

