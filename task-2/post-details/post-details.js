document.addEventListener('DOMContentLoaded', (e) => {
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('id');

  if (postId) {
    const postRequest = fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    ).then((res) => res.json());
    const postCommentsRequest = fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    ).then((res) => res.json());

    Promise.all([postRequest, postCommentsRequest])
      .then(([post, comments]) => {
        buildPostInfo(post);
        buildPostCommentsList(comments);
      })
      .catch(({ reason }) => console.log(reason));
  }
});

function buildPostInfo(post) {
  const dl = document.getElementById('post_props');
  const props = Object.entries(post);
  const dlItems = Array(props.length * 2);

  for (let i = 0, length = props.length; i < length; ++i) {
    const [key, value] = props[i];
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');

    dt.innerText = key;
    dd.innerText = value;

    dlItems[2 * i] = dt;
    dlItems[2 * i + 1] = dd;
  }

  dl.append(...dlItems);
}

function buildPostCommentsList(comments) {
  const parent = document.getElementById('post');
  const ul = document.getElementById('comments');

  const listItems = comments.map(({ body, email, name }) => {
    const li = document.createElement('li');
    li.className = 'comment';
    li.innerHTML = `<p>${body}</p>
      <addr>${name}, ${email}</addr>`;

    return li;
  });

  ul.append(...listItems);
  parent.appendChild(ul);
}
