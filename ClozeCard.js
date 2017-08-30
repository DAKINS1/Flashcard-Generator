function ClozeCard (text, cloze) {
     text = text;
     cloze = cloze;

    // throw or log an error when the cloze deletion does not appear in the input text.
    if (!text.includes(cloze)) {
        console.log('ERROR:' + cloze + ' does not appear within full text.');
        return;
    }

    this.full = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');
}

module.exports = ClozeCard;
