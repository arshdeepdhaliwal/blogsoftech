const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const body = document.querySelector('textarea[name="post-body"]').value.trim();
  const author = document.querySelector('input[name="post-author"]').value.trim() || 'Anonymous';

  if (title && body) {
    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          author,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create post');
    }
  } else {
    alert('Please fill out both the title and body fields');
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
