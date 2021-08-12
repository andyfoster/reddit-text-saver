// TODO
/*
   test whether this is the new or old reddit
   - use the old reddit extension to check

*/

var hostname = window.location.hostname;

if (hostname === "old.reddit.com")

  var elements = {

     bodyText: document.querySelector('.expando .usertext-body').innerText,
     title: document.querySelector('div.top-matter > p.title > a').innerText,
     score: document.querySelector('div.score.unvoted').innerText,
     tagline: document.querySelector('div.top-matter > p.tagline').innerText,
     topMatter: document.getElementsByClassName('top-matter')[0],
     date: document.querySelector('time').innerText,
     author: document.querySelector('.top-matter .tagline .author').innerText
}

  else if (hostname === "www.reddit.com") {
    var textElement = document.querySelector('[data-click-id="text"] div');

    // try {
    //   title: textElement.parentElement.parentElement.querySelector('h1').innerText

    // } catch(e) {
    //   try {
    //     title: textElement.parentElement.parentElement.querySelector('h3').innerText
    //   }
    // }

    var elements = {

       bodyText: textElement.innerText,
       title: textElement.parentElement.parentElement.querySelector('h1').innerText,
       tagline: textElement.parentElement.parentElement.parentElement.querySelector('div div div').innerText,

       // score: document.querySelector('div.score.unvoted').innerText,
       // "Posted byu/girl_from_the_crypt 16 hours ago"
       score: textElement.parentElement.parentElement.querySelector('div:nth-child(2) > div div').innerText,
       topMatter: document.querySelector("#t3_fxf27u > div > div._2FCtq-QzlfuN-SwVMUZMM3._2v9pwVh0VUYrmhoMv1tHPm.t3_fxf27u > div.y8HYJ-y_lTUHkQIc1mdCq._2INHSNB8V5eaWp4P0rY_mE > div"),
       author: "--",
       date: "--"
       // // tagline: document.querySelector('div.top-matter > p.tagline').innerText,
       // topMatter: document.getElementsByClassName('top-matter')[0],
       // date: document.querySelector('time').innerText,
       // author: document.querySelector('.top-matter .tagline .author').innerText
    }
  }


var bodyText = elements.bodyText;
var title = elements.title;
var score = elements.score;
var tagline = elements.tagline;
var topMatter = elements.topMatter;
var date = elements.date;
var author = elements.author;

var mimeType = 'text/html';

var link = document.createElement('a');
link.innerHTML = 'Download article as .txt';
link.setAttribute('style', 'border: 1px solid #444; padding: 1px 6px; background: #7BB254; color: white; font-size: 10px; font-weight: bold; line-height: 20px; border-radius: 3px; display: inline-block');
link.setAttribute('onclick', "$(this).css('background-color','#FC471E').text('Downloaded')");
link.setAttribute('download', title + '.txt');

var newTagline = 'submitted ' + date + ' by ' + author

var url = document.location.href;

link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(title + '\n\n[' + score + '] ' + newTagline + '\n\n' + bodyText + '\n\n----------\n' + url));
// to do
// parse the date field and make that a real date
// work on new reddit

topMatter.appendChild(link);


