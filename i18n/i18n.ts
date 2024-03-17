import en from "./en.json"
import ja from "./ja.json"

export function getI18NText(): typeof en
{
    switch (window.navigator.language.split("-")[0])
    {
        case "en": return en
        case "ja": return ja
        default: return en
    }
}