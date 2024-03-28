const fs = require('fs');
const path = require('path');

(() => {
  const contacts = fs.readFileSync(path.join(__dirname, '..', '..', 'arquivos', 'contatos.json'), 'utf8');
  const allContacts = JSON.parse(contacts);
  const valid = allContacts
    .filter((contact) => !contact['First Name'].toLowerCase().includes('tantra'))
    .map((contact) => ({
      name: contact['First Name'].split(' ')[0] || contact['Display Name'].split(' ')[0],
      phone: contact['Mobile Phone'] || contact['Home Phone'] || contact['Work Phone'] || contact['Other Phone'],
    })).filter((contact) => contact.phone && contact.name);
  fs.writeFileSync(path.join(__dirname, '..', '..', 'arquivos', 'contatosSemTantra.json'), JSON.stringify(valid, null, 2));
  const txt = valid.map((contact) => `${contact.name}, ${contact.phone}`).join('\n');
  fs.writeFileSync(path.join(__dirname, '..', '..', 'arquivos', 'contatos.txt'), txt);
})();
