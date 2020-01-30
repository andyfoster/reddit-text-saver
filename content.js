var bodyText = document.querySelector('.expando .usertext-body').innerText;
var title = document.querySelector('div.top-matter > p.title > a').innerText;
var topMatter = document.getElementsByClassName('top-matter')[0];
var mimeType = 'text/html';

var link = document.createElement('a');
link.innerHTML = 'Download article as .txt';
link.setAttribute("style", "border: 1px solid #444; padding: 1px 6px; background: #7BB254; color: white; font-size: 10px; font-weight: bold; line-height: 20px; border-radius: 3px;");
link.setAttribute('download', title + '.txt');
link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(title + "\n\n" + bodyText));

topMatter.appendChild(link);
