import en from "./en.json"
import ja from "./ja.json"
import zh from "./zh.json"

export function getI18NText(specified_language?: string)
{
    let text: typeof en
    let locale = specified_language ?? (window.navigator.language.split("-")[0])

    switch (locale)
    {
        case "en": text = en; break
        case "ja": text = ja; break
        case "zh": text = zh; break
        default: text = en; break
    }

    return { locale, text }
}