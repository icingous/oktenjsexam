document.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      const { ok, status, statusText } = res;
      if (ok) {
        return res.json();
      } else {
        console.log(`${status} ${statusText}`);
      }
    })
    .then((res) => {
      if (!Array.isArray(res)) return;

      buildUserList(res);
    })
    .catch(({ reason }) => console.log(reason));
});

function buildUserList(users) {
  const parent = document.getElementById('users');
  const ul = document.createElement('ul');

  users.forEach((user) => {
    const { id, name } = user;
    const li = document.createElement('li');
    const idSpan = document.createElement('span');
    const nameSpan = document.createElement('span');
    const a = document.createElement('a');

    li.className = 'user';
    idSpan.innerText = id;
    nameSpan.innerText = name;
    a.href = `user-details/user-details.html?id=${id}`;
    a.target = '_blank';
    a.innerText = 'details';
    li.append(idSpan, nameSpan, a);
    ul.append(li);
  });

  parent.appendChild(ul);
}
