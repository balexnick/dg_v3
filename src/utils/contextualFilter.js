export const contextualFilterQueryParser = (data) => {
  const checkedItems = [];

  data.forEach(item => {
    const list = [];
    item.values.forEach(current => {
      if (current.isChecked) list.push(current.id);
    });

    if (list.length === item.values.length) return;

    const paramValues = list.length === 0 ? '' : list.join('|');

    checkedItems.push(`&${item.name}=${paramValues}`);
  });

  if (checkedItems.length === 0) return '';

  const qs = checkedItems.join('');

  return `?${qs.slice(1)}`;
};
