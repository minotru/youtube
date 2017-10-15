export function DOMElementFromString(string) {
    let template = document.createElement("template");
    template.innerHTML = string;
    return template.content.firstChild;
}

export function renderDOM(string, parentNode) {
    return parentNode.appendChild(DOMElementFromString(string));
}

