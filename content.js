console.log('[RedditSaver] Content script loaded on:', window.location.href);
console.log('[RedditSaver] Hostname:', window.location.hostname);

var isOldReddit = window.location.hostname === 'old.reddit.com';
console.log('[RedditSaver] Is old Reddit:', isOldReddit);

if (isOldReddit) {
    runOldReddit();
} else {
    // New Reddit is an SPA — post content may not be in the DOM yet.
    // Poll until the title element appears, then run.
    console.log('[RedditSaver] Waiting for new Reddit post to render...');
    var attempts = 0;
    var maxAttempts = 50; // 10 seconds max
    var poll = setInterval(function() {
        attempts++;
        var titleEl = document.querySelector('h1[slot="title"]');
        console.log('[RedditSaver] Poll attempt', attempts, '- h1[slot="title"]:', titleEl ? 'FOUND' : 'not found');
        if (titleEl) {
            clearInterval(poll);
            runNewReddit();
        } else if (attempts >= maxAttempts) {
            clearInterval(poll);
            console.log('[RedditSaver] Gave up waiting for post content after', maxAttempts, 'attempts');
        }
    }, 200);
}

function runOldReddit() {
    console.log('[RedditSaver] Running old Reddit extraction');
    var bodyText = document.querySelector('.expando .usertext-body').innerText;
    var title = document.querySelector('div.top-matter > p.title > a').innerText;
    var score = document.querySelector('div.score.unvoted').innerText;
    var author = document.querySelector('.top-matter .tagline .author').innerText;
    var date = document.querySelector('time').innerText;
    var anchorParent = document.getElementsByClassName('top-matter')[0];

    console.log('[RedditSaver] Old Reddit - title:', title);
    console.log('[RedditSaver] Old Reddit - author:', author);
    console.log('[RedditSaver] Old Reddit - date:', date);
    console.log('[RedditSaver] Old Reddit - score:', score);
    console.log('[RedditSaver] Old Reddit - body length:', bodyText.length);

    attachDownloadLink(anchorParent, title, score, author, date, bodyText);
}

function runNewReddit() {
    console.log('[RedditSaver] Running new Reddit extraction');

    var titleEl = document.querySelector('h1[slot="title"]');
    var title = titleEl ? titleEl.innerText.trim() : '';
    console.log('[RedditSaver] Title element:', titleEl);
    console.log('[RedditSaver] Title text:', title);

    var bodyEl = document.querySelector('[property="schema:articleBody"]');
    var bodyText = bodyEl ? bodyEl.innerText : '';
    console.log('[RedditSaver] Body element:', bodyEl);
    console.log('[RedditSaver] Body text length:', bodyText.length);

    var authorEl = document.querySelector('a.author-name');
    var author = authorEl ? authorEl.innerText : 'unknown';
    console.log('[RedditSaver] Author element:', authorEl);
    console.log('[RedditSaver] Author:', author);

    var timeEl = document.querySelector('#pdp-credit-bar time[datetime]');
    console.log('[RedditSaver] Time element:', timeEl);
    var date;
    if (timeEl) {
        var d = new Date(timeEl.getAttribute('datetime'));
        date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        console.log('[RedditSaver] Parsed date:', date);
    } else {
        var fallbackTime = document.querySelector('time');
        date = fallbackTime ? fallbackTime.innerText : '';
        console.log('[RedditSaver] Fallback time element:', fallbackTime);
        console.log('[RedditSaver] Fallback date:', date);
    }

    var scoreEl = document.querySelector('shreddit-post[score]');
    var score = scoreEl ? scoreEl.getAttribute('score') + ' points' : '';
    console.log('[RedditSaver] Score element:', scoreEl);
    console.log('[RedditSaver] Score:', score);

    var anchorParent = titleEl.parentElement;
    console.log('[RedditSaver] Anchor parent element:', anchorParent);

    attachDownloadLink(anchorParent, title, score, author, date, bodyText);
}

function attachDownloadLink(anchorParent, title, score, author, date, bodyText) {
    var url = document.location.href;
    var newTagline = 'submitted ' + date + ' by ' + author;
    var mimeType = 'text/html';

    var link = document.createElement('a');
    link.innerHTML = 'Download article as .txt';
    link.setAttribute('style', 'border: 1px solid #444; padding: 1px 6px; background: #7BB254; color: white; font-size: 10px; font-weight: bold; line-height: 20px; border-radius: 3px; cursor: pointer; display: inline-block; margin: 4px 0;');
    link.setAttribute('download', title + '.txt');
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(title + '\n\n[' + score + '] ' + newTagline + '\n\n' + bodyText + '\n\n----------\n' + url));

    link.addEventListener('click', function() {
        this.style.backgroundColor = '#FC471E';
        this.textContent = 'Downloaded';
    });

    anchorParent.appendChild(link);
    console.log('[RedditSaver] Download link attached successfully');
}
