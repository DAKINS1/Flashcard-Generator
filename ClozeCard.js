function ClozeCard (text, cloze) {
    this.full = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');
    // throw or log an error when the cloze deletion does not appear in the input text.
    if (!text.includes(cloze)) {
        console.log('ERROR:' + cloze + ' does not appear within full text.');
        return;
    }
}

module.exports = ClozeCard;
