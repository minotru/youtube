export function createElement(name, attrs, ...children) {
    let el = document.createElement(name);
    if (attrs !== null)
        for (let attr in attrs)
            if (attrs.hasOwnProperty(attr))
                el.setAttribute(attr, attrs[attr]);
    children.forEach(child => {
        if (typeof(child) == "string")
            el.appendChild(document.createTextNode(child))
        else
            el.appendChild(child);
    });
    return el;
}

export function createElementFromHTML(html) {
    let el = document.createElement("template");
    el.innerHTML = html;
    return el.content.firstChild;
}
