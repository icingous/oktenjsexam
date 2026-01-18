document.addEventListener('DOMContentLoaded', (e) => {
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  if (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        const { ok, status, statusText } = res;

        if (ok) {
          return res.json();
        } else {
          console.log(`${status} ${statusText}`);
        }
      })
      .then((res) => {
        if (!res) return;

        buildUserPropsInfo(res);

        const btn = document.getElementById('get_posts');
        btn.addEventListener('click', () => getUserPosts(userId));
      })
      .catch(({ reason }) => console.log(reason));
  }
});

function buildUserPropsInfo(userProps) {
  const dl = document.getElementById('user_props');
  const props = Object.entries(userProps);
  const dlItems = Array(props.length * 2);

  for (let i = 0, length = props.length; i < length; ++i) {
    const [key, value] = props[i];
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');

    dt.innerText = key;
    dd.innerText = stringifyValue(value);

    dlItems[2 * i] = dt;
    dlItems[2 * i + 1] = dd;
  }

  dl.append(...dlItems);
}

function stringifyValue(value) {
  if (value instanceof Object)
    return Object.values(value)
      .map((value) => stringifyValue(value))
      .join(', ');

  return value;
}

function getUserPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((res) => {
      const { ok, status, statusText } = res;

      if (ok) {
        return res.json();
      } else {
        console.log(`${status} ${statusText}`);
      }
    })
    .then((res) => {
      if (!res) return;

      buildUserPostsList(res);
    })
    .catch(({ reason }) => console.log(reason));
}

function buildUserPostsList(posts) {
  const parent = document.getElementById('user');
  let ul = document.getElementById('posts');

  if (ul) {
    parent.removeChild(ul);
  }

  ul = document.createElement('ul');
  ul.id = 'posts';

  const listItems = posts.map(({ id, title }) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const a = document.createElement('a');

    span.innerText = id;
    a.innerText = title;
    a.href = `../post-details/post-details.html?id=${id}`;
    a.target = '_blank';
    li.append(span, a);

    return li;
  });

  ul.append(...listItems);
  parent.appendChild(ul);
}
