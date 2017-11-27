import SearchBar from "./src/SearchBar"
import Clip from "./src/Clip"
import * as Util from "./src/Util"

const body = document.getElementsByTagName("body")[0];
var clips = [];
var prevPage = null, currentPage = null, nextPage = null;
var currentClip = 0;
var clipsPerPage;
var clipWidth = 320;
var nextPageToken = undefined;
var startMouseX = null;
var prevMouseX = null;
var isMouseDown = false;
var pageWidth;


function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyDKMfCEnxwMoBccp6pcZj1WjoyHTxDw4YE');
}

function buildVideoUrlFromId(id) {
    return "https://www.youtube.com/watch?v=" + id;
}

function extractClipPropsFromResponse(item) {
    const snippet = item.snippet;
    return {
        preview: snippet.thumbnails.medium.url,
        clipUrl: buildVideoUrlFromId(item.id.videoId),
        title: snippet.title,
        author: snippet.channelTitle,
        date: new Date(snippet.publishedAt),
        description: snippet.description
    }
}

function removeChildren(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}

function loadClips(searchText) {
    const request = gapi.client.youtube.search.list({
        part: "snippet",
        q:searchText,
        pageToken: nextPageToken,
        maxResults: 15,
    });
    let propsList = [];
    request.then(response => {
        response = response.result;
        nextPageToken = response.nextPageToken;
        let ids = [];
        response.items.forEach(item => {
            ids.push(item.id.videoId);
            propsList.push(extractClipPropsFromResponse(item));
        });
        return gapi.client.youtube.videos.list({
            part: "statistics",
            id: ids.toString()
        });
    }).then(response => {
        const statistics = response.result;
        statistics.items.forEach((item, ind) => 
            propsList[ind].viewCount = item.statistics.viewCount
        );
        propsList.forEach(props =>
              clips.push(Clip(props)));
        updatePage();
    });
}

function createPage(startInd) {
    if (startInd < 0 || startInd >= clips.length)
        return null;
    let page = Util.createElement(
        "div",
        {
            "class": "clips-page"
        }
    );
    const clipsCnt = Math.min(clipsPerPage, clips.length - startInd);
    for (let i = startInd; i < startInd + clipsCnt; i++)
        page.appendChild(clips[i]);
    return page;
}


function search(text) {
    nextPageToken = undefined;
    if (currentPage !== null)
        removeChildren(currentPage);
    loadClips(text);
}

function animate(direction) {
    if (direction === -1 && currentClip === 0) 
        return;
    if (direction === 1 && currentClip + clipsPerPage >= clips.length)
        loadClips();
    currentClip += clipsPerPage * direction;
    const pages =  document.getElementById("pages");
    const page = pages.firstChild;
    const nextPage = createPage(currentClip);
    if (direction === 1) 
        pages.appendChild(nextPage); 
    else
        pages.insertBefore(nextPage, pages.firstChild);
    page.style.transitionDuration = "1s";
    page.style.left = -direction * pageWidth + "px";
    setTimeout(function() {
        pages.removeChild(page);
    }, 1000);

}

window.animate = animate;

function updatePage() {
    handleResize();
    const pages = document.getElementById("pages");
    removeChildren(document.getElementById("pages"));
    pages.appendChild(createPage(currentClip));
}

function handleResize() {
    pageWidth = document.getElementById("app").offsetWidth;
    clipsPerPage = Math.floor((pageWidth * 0.9) / clipWidth);
}

window.onClientLoad = onClientLoad;
window.onresize = updatePage;
function onMouseDown(event) {
    if (event.button !== 0)
        return;
    event.stopPropagation();
    isMouseDown = true;
    prevMouseX = startMouseX = event.clientX;
}

function onMouseUp(event) {
    if (!(event.button === 0 && isMouseDown))
        return;
    isMouseDown = false;
    if (event.clientX - startMouseX < 0)
        animate(1);
    else if (event.clientX - startMouseX > 0)
        animate(-1);
}

function onMouseMove(event) {
    if (!isMouseDown || event.button !== 0)
        return;
    const pages = document.getElementById("pages")
    const deltaX = event.clientX - prevMouseX;
    pages.style.marginLeft = 
       pages.style.marginLeft.valueOf() + deltaX + "px" ;
    prevMouseX = event.clientX;
}

const pages =  Util.createElement(
    "div",
    {
        "class": "clips-page-container",
        "id": "pages"
    }
);
pages.onmouseup = onMouseUp;
pages.onmousedown = onMouseDown;
pages.onmousemove = onMouseMove;

const app = Util.createElement(
    "div",
    {
        "class": "wrapper",
        "id": "app"
    },
    SearchBar({onSearch: search}),
    pages
);

document.body.appendChild(app);