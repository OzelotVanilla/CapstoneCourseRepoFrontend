import en from "./en.json"
import ja from "./ja.json"

export function getI18NText(specified_language?: string)
{
    let text: typeof en
    let locale = specified_language ?? (window.navigator.language.split("-")[0])

    switch (locale)
    {
        case "en": text = en; break
        case "ja": text = ja; break
        default: text = en; break
    }

    return { locale, text }
}