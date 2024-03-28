const puppeteer = require('puppeteer');
const clipboard = require('node-clipboardy');
const readRecipients = require('./utils/readRecipients');
const wait = require('./utils/wait');
const writeFile = require('./utils/writeFile');
const readMessage = require('./utils/readMessage');

(async () => {
  const { valid, invalid } = readRecipients();
  const message = readMessage();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1024,
    height: 768,
  });

  await page.goto('https://web.whatsapp.com/');
  await wait(30000);
  await page.waitForSelector('text/Baixar o WhatsApp para Windows');

  for (let i = 0; i < valid.length; i++) {
    const { phone } = valid[i];
    const chatInitBtn = await page.waitForSelector('aria/Nova conversa');
    await chatInitBtn.click();
    await wait(1000);
    clipboard.writeSync(phone);
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await wait(2000);

    const foundContact = await page
      .waitForSelector('text/Contatos no WhatsApp', { timeout: 3000 })
      .then(() => true)
      .catch(() => false);

    if (foundContact) {
      await page.keyboard.press('Enter');
      await page.waitForSelector('text/Digite uma mensagem');
      clipboard.writeSync(message);
      await page.keyboard.down('Control');
      await page.keyboard.press('V');
      await page.keyboard.up('Control');
      await wait(1500);
      await page.keyboard.press('Enter');
      await wait(2000);
    } else {
      invalid.push(`${valid[i].name}, ${valid[i].phone}`);
      await page.keyboard.press('Escape');
      await wait(2000);
    }
  }

  if (invalid.length) {
    writeFile(invalid);
  }

  await browser.close();
})();
