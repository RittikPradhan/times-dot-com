const service = require('../services/stories.service');

function fetchTimeStories(res) {
  service.getTimeStories((data) => {
    const stories = parseStories(data);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stories, null, 2));
  });
}

function parseStories(data) {
  const stories = [];
  let currentIndex = 0;

  for (let count = 0; count < 6; count++) {
    currentIndex = data.indexOf('<li class="latest-stories__item">', currentIndex);
    
    if (currentIndex === -1) {
      break; // Exit the loop if no more stories are found
    }

    const linkStart = data.indexOf('<a href="', currentIndex) + '<a href="'.length;
    const linkEnd = data.indexOf('">', linkStart);
    const link = 'https://time.com' + data.substring(linkStart, linkEnd).trim();

    const titleStart = data.indexOf('<h3 class="latest-stories__item-headline">', linkEnd) + '<h3 class="latest-stories__item-headline">'.length;
    const titleEnd = data.indexOf('</h3>', titleStart);
    const title = data.substring(titleStart, titleEnd).trim();

    stories.push({ title, link });
    currentIndex = titleEnd + '</h3>'.length;
  }

  return stories;
}

module.exports = { fetchTimeStories };
