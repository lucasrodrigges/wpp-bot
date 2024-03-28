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
    })).filter((contact) => contact.phone && contact.name)
    .sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(path.join(__dirname, '..', '..', 'arquivos', 'contatosSemTantra.json'), JSON.stringify(valid, null, 2));

  // create a single file with all contacts
  // const txt = valid.map((contact) => `${contact.name}, ${contact.phone}`).join('\n');
  // fs.writeFileSync(path.join(__dirname, '..', '..', 'arquivos', 'contatos.txt'), txt);

  // create a file for each 200 contacts
  const contactsPerFile = 500;
  const files = Math.ceil(valid.length / contactsPerFile);
  for (let i = 0; i < files; i++) {
    const start = i * contactsPerFile;
    const end = (i + 1) * contactsPerFile;
    const thisContacts = valid.slice(start, end);
    const newTxt = thisContacts.map((contact) => `${contact.name}, ${contact.phone}`).join('\n');
    fs.writeFileSync(path.join(__dirname, '..', '..', 'arquivos', `contatos${i}.txt`), newTxt);
  }
})();
