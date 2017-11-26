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
        <div class = "clip-content">
            <div class = "clip-metrics">
                <p class = "clip-metric">\
                    <i class="material-icons clip-metrics-icon">face</i>\
                    ${props.author}
                </p>\
                <p class = "clip-metric">\
                    <i class="material-icons clip-metrics-icon">date_range</i>\
                    ${dateString}
                </p>\
                <p class = "clip-metric"> \
                    <i class = "material-icons clip-metrics-icon">visibility</i>\
                    ${props.viewCount}
                </p>\  
            </div>
            <p class = "clip-description">${props.description}</p>\
        </div>
    </div>`;
    return createElementFromHTML(html);
    
}

