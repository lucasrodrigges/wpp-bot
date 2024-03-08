const removeMask = (value) => value.replace(/\D/g, '');

const phoneMask = (phone = '') => {
  const value = phone.replace(/\D/g, '');

  if (value) {
    if (value.length <= 11) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})/, '+$1($2) ')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  return '';
};

module.exports = {
  removeMask,
  phoneMask,
};
