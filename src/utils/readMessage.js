const fs = require('fs');
const path = require('path');

module.exports = () => {
  try {
    const filePath = path.join(__dirname, '../../arquivos/mensagem.txt');
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.log('Erro ao ler o arquivo de mensagens.');
    return '';
  }
};
