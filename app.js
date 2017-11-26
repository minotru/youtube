import SearchBar from "./src/SearchBar"
import Clip from "./src/Clip"
import * as Util from "./src/Util"

const body = document.getElementsByTagName("body")[0];
var nextPageToken = null;

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
    let request;
    if (typeof searchText !== "undefined") {
        request = gapi.client.youtube.search.list({
            part: "snippet",
            q:searchText
        });
        removeChildren(document.getElementById("clips"));
    }
    else
        request = gapi.client.youtube.search.list({
            part: "snippet",
            pageToken: nextPageToken
        });
    let propsList = [];
    request.then(response => {
        response = response.result;
        nextPageToken = response.nextPageToken;
        //console.log(response);
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
             document.getElementById("clips").appendChild(Clip(props)));
    });
}

function search(text) {
   nextPageToken = null;
   loadClips(text);
}

window.onClientLoad = onClientLoad;

const page = Util.createElement(
    "div",
    {
        "class": "page"
    },
    SearchBar({onSearch: search}),
    Util.createElement(
        "div",
        {
            "class": "clips-list",
            "id": "clips"
        }
    )
);

document.body.appendChild(page);
