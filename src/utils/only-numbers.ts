export const onlyNumbers = (value = '') => {
  if (value === '') return value;

  let val = value.replace(/[^0-9.]/g, '');

  if (val === '.') return '0.';

  if (val === '00') return '0.0';

  if (val[0] === '0' && !val.includes('.') && val.length > 2) {
    val = '0.' + val.slice(1);
  }

  const dotsNumber = val.split('.').length - 1;

  if (dotsNumber > 1) {
    const parts = val.split('.');
    val = `${parts.slice(0, -1).join('')}.${parts[parts.length - 1]}`;
  }

  if (!+val[0] && val.length > 2) {
    const [l, r] = val.split('.');

    val = `${parseFloat(l)}.${r}`;
  }

  return val;
};
