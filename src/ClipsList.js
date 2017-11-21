import {createElement} from "./Util"
import Clip from "./Clip"

function ClipsList(props) {
    return Util.createElement(
        "ul",
        {
            "class": "clips-list"
        }
    );
}