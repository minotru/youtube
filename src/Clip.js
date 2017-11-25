import {createElementFromHTML} from "./Util"

export default function Clip(props) {
    const date = props.date;
    const dateString = 
        date.getFullYear() + "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
        date.getDate().toString().padStart(2, "0"); 
    const html = 
    `<div class = "clip">\
        <div class = "clip-header-container">
            <img class = "clip-preview" src = ${props.preview}>\
            <a class = "clip-title" target = "_blank" href = "${props.clipUrl}">\
                ${props.title}
            </a>\
        </div>
        <div class = "clip-data">
            <p class = "clip-author">\
                <i class="material-icons">face</i>\
                ${props.author}
            </p>\
            <p class = "clip-date">\
                <i class="material-icons">date_range</i>\
                ${dateString}
            </p>\
            <p class = "clip-viewCount"> \
                <i class = "material-icons">visibility</i>\
                ${props.viewCount}
            </p>\
            
        </div>
        <p class = "clip-description">${props.description}</p>\
    </div>`;
    return createElementFromHTML(html);
    
}

