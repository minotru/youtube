import {renderDOM, DOMElementFromString} from "./src/utils";
import Clip from "./src/Clip"

let body = document.getElementsByTagName("body")[0];
// const props = {
//     title: "The best",
//     author: "Me",
//     views: 100500,
//     date: "today",
//     description: "Yeah, baby"
// };

const items = [
    {
        title: "The best",
        author: "Me",
        views: 100500,
        date: "today",
        description: "Yeah, baby" 
    },
    {
        title: "How to stay alive on FAMCS",
        author: "Zhibrik",
        views: "100",
        date: "10.12.2015",
        description: "It's sad, but..."
    }
]

items.forEach(props => renderDOM(Clip(props), body));

//renderDOM(Clip(props), body);