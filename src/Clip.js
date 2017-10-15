import "./Clip.css"

export default function Clip(props) {
    const res =  
    `<div class = 'Clip'>
        <h1>${props.title}</h1>
        <p>${props.author}</p>
        <p>${props.date}</p>
        <p>${props.views}</p>
        <p>${props.description}</p>
    </div>`;
    return res;
}