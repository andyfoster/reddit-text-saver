var bodyText = document.querySelector('.expando .usertext-body').innerText;
var title = document.querySelector('div.top-matter > p.title > a').innerText;
var score = document.querySelector('div.score.unvoted').innerText;
var tagline = document.querySelector('div.top-matter > p.tagline').innerText;
var topMatter = document.getElementsByClassName('top-matter')[0];
var mimeType = 'text/html';

var link = document.createElement('a');
link.innerHTML = 'Download article as .txt';
link.setAttribute('style', 'border: 1px solid #444; padding: 1px 6px; background: #7BB254; color: white; font-size: 10px; font-weight: bold; line-height: 20px; border-radius: 3px;');
link.setAttribute('onclick', "$(this).css('background-color','#FC471E').text('Downloaded')");
link.setAttribute('download', title + '.txt');

var date = document.querySelector('time').innerText;
var author = document.querySelector('.top-matter .tagline .author').innerText;
var newTagline = 'submitted ' + date + ' by ' + author;

var url = document.location.href;

link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(title + '\n\n[' + score + '] ' + newTagline + '\n\n' + bodyText + '\n\n----------\n' + url));
// TODO
// - parse the date field and make that a real date
// - work on new reddit

topMatter.appendChild(link);
