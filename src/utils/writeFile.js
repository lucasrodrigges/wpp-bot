const fs = require('fs');
const path = require('path');

module.exports = (data) => {
  const filePath = path.join(__dirname, '../../');
  fs.writeFileSync(`${filePath}/telefones-invalidos.txt`, data.join('\n'));
};
