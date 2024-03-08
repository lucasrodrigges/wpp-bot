const fs = require('fs');
const path = require('path');
const { removeMask } = require('./mask');

module.exports = () => {
  try {
    const filePath = path.join(__dirname, '../../arquivos/contatos.txt.txt');
    const data = fs.readFileSync(filePath, 'utf8').split(/[\r\n]+/).map((item) => item.trim());
    return data.reduce((acc, curr) => {
      const [name, phone] = curr.split(',');
      let currentPhone = removeMask(phone);

      if (!name) {
        return {
          ...acc,
          invalid: [
            ...acc.invalid,
            curr,
          ],
        };
      }

      if (!currentPhone
        || currentPhone.length < 10
        || currentPhone.length > 13
      ) {
        return {
          ...acc,
          invalid: [
            ...acc.invalid,
            curr,
          ],
        };
      }

      if (currentPhone.length === 11) {
        const cityCode = currentPhone.substring(0, 2);
        const thisPhone = currentPhone.substring(3);
        currentPhone = cityCode + thisPhone;
      }

      if (currentPhone.length === 13) {
        const cityCode = currentPhone.substring(2, 4);
        const thisPhone = currentPhone.substring(5);
        currentPhone = cityCode + thisPhone;
      }

      return {
        ...acc,
        valid: [
          ...acc.valid,
          {
            name,
            phone: currentPhone,
            length: currentPhone.length,
          },
        ],
      };
    }, {
      valid: [],
      invalid: [],
    });
  } catch (error) {
    console.log('Erro ao ler o arquivo.');
    return [];
  }
};
