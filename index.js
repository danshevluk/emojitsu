const emojilib = require('emojilib');
const alfy = require('alfy');

const emojis = emojilib.lib;

function toAlfredResult(emojiKey) {
  const resultEmoji = emojis[emojiKey];
  const emojiChar = resultEmoji.char;
  return { 
    title: emojiChar,
    subtitle: emojiKey,
    arg: emojiChar,
    text: {
      copy: emojiChar,
      lartgeType: emojiChar
    }
  };
}

function includesOrIncluded(lhs, rhs) {
  return lhs.includes(rhs) || rhs.includes(lhs)
}

function emojiKeysForSearchTerm(searchTerm) {
  return Object.keys(emojis)
    .filter(key => { 
      const emojiData = emojis[key];
      const containsKeywords = emojiData.keywords
        .map(keyword => includesOrIncluded(keyword, searchTerm))
        .reduce((result, element) => result || element);
      const containsEmojiName = includesOrIncluded(searchTerm, key)
      return containsKeywords || containsEmojiName; 
    });
}

function searchEmoji(query) {
  const searchWord = query.split(' ')[0];

  return emojiKeysForSearchTerm(searchWord).map(toAlfredResult).slice(0, 9);
}

const query = alfy.input;
const results = searchEmoji(query);

if (!results.isEmpty) {
  alfy.output(results);
} else {
  alfy.output({ title: 'No matches for ' + query });
}

