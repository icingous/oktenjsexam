let inputValue;

const toggleSelection = (e) => {
  e.target.classList.toggle('selected');
};

const toggleSelectionByKeyboard = (e) => {
  if (e.key !== 'Enter') return;

  e.target.classList.toggle('selected');
};

const sort = (list, byKey) => {
  const items = [...list.children].map((item) => list.removeChild(item));
  let sortedItems;

  if (byKey) {
    sortedItems = [...items].toSorted((a, b) =>
      a.dataset.key === b.dataset.key
        ? 0
        : a.dataset.key > b.dataset.key
        ? 1
        : -1
    );
  } else {
    sortedItems = [...items].toSorted((a, b) =>
      a.dataset.value === b.dataset.value
        ? 0
        : a.dataset.value > b.dataset.value
        ? 1
        : -1
    );
  }

  sortedItems.forEach((item) => list.appendChild(item));
};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('key_value_input');
  const list = document.getElementById('key_value_list');
  const addButton = document.getElementById('add');
  const deleteButton = document.getElementById('delete');
  const sortByKeyButton = document.getElementById('sort_by_key');
  const sortByValueButton = document.getElementById('sort_by_value');

  input.addEventListener('change', (e) => {
    inputValue = e.target.value;
  });

  addButton.addEventListener('click', () => {
    if (!inputValue) return;

    if (!inputValue.match(/^\w+\s*=\s*\w+$/)) return;

    const [key, value] = inputValue.split('=');
    const li = document.createElement('li');

    li.innerText = `${key.trim()}=${value.trim()}`;
    li.dataset.key = key;
    li.dataset.value = value;
    li.tabIndex = 0;
    li.addEventListener('click', toggleSelection);
    li.addEventListener('keypress', toggleSelectionByKeyboard);
    list.appendChild(li);
    input.value = inputValue = '';
    input.focus();
  });

  deleteButton.addEventListener('click', () => {
    list.querySelectorAll('.selected').forEach((item) => {
      item.removeEventListener('click', toggleSelection);
      item.removeEventListener('keypress', toggleSelectionByKeyboard);
      item.remove();
    });
  });

  sortByKeyButton.addEventListener('click', () => sort(list, true));
  sortByValueButton.addEventListener('click', () => sort(list));
});
