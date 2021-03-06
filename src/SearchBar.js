import {createElementFromHTML, createElement} from "./Util";

export default function SearchBar(props) {
    const button = createElementFromHTML(
    `<button type="button" class="search-button" autofocus>
        <i class="material-icons">search</i>
    </button>`);
    const input = createElementFromHTML(
        `<input type="search" class = "search-bar" placeholder = "Your request...">`);
    const element = createElement(
        "div",
        {
            "class": "search-bar-box"
        },
        button,
        input
    );
    button.onclick = function() {
        if (input.value.length != 0)
            props.onSearch(input.value);
    };
    input.onkeyup = function(event) {
        if (event.keyCode === 13)
            button.click();
    }
    // `<div class="search-bar-box">
    //     <button type="button" class="search-button">
    //         <i class="material-icons">search</i>
    //     </button>
    //     <input type="search" class = "search-bar" placeholder = "Your request...">
    // </div>`;
    // const element = createElementFromHTML(html);
    // element.firstChild.addEventListener("click", props.onSearch);

    return element;
}