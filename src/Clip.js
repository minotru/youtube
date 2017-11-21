import {createElementFromHTML} from "./Util"

export default function Clip(props) {
    const html = 
    `<div class = "clip">\
        <img class = "clip-preview" src = ${props.preview}>\
        <a class = "clip-title" href = "${props.clipUrl}">${props.title}</a>\
        <p class = "clip-author">${props.author}</p>\
        <p class = "clip-date">${props.date}</p>\
        <p class = "clip-views">${props.views}</p>\
        <p class = "clip-decription">${props.description}</p>\
    </div>`;
    return createElementFromHTML(html);
    
}