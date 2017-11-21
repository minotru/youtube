import SearchBar from "./src/SearchBar"
import Clip from "./src/Clip"

const body = document.getElementsByTagName("body")[0];

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyDKMfCEnxwMoBccp6pcZj1WjoyHTxDw4YE');
}

function buildVideoUrlFromId(id) {
    return "https://www.youtube.com/watch?v=" + id;
}

function extractClipPropsFromResponse(item) {
    const snippet = item.snippet;
    return {
        preview: snippet.thumbnails.default.url,
        clipUrl: buildVideoUrlFromId(item.id.videoId),
        titile: snippet.title,
        author: snippet.channelTitle,
        date: new Date(snippet.publishedAt),
        //views: item.statistics.viewCount
    }
}

function search(text) {
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: text
    });
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    //response = JSON.parse(response);
    console.log(response);
    response.items.forEach(item => {
        const props = extractClipPropsFromResponse(item);
        console.log(props);
        const clip = Clip(props);
        document.getElementById("clips").appendChild(clip);
    });
}

window.onClientLoad = onClientLoad.bind(this);
const searchBar = SearchBar({onSearch: search.bind(this)});
const clips = document.createElement("div");
clips.id = "clips";
body.appendChild(searchBar);
body.appendChild(clips);

