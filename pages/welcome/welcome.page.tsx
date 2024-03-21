import { useContext } from "react"
import "./welcome.page.scss"
import { useIonRouter, useIonViewWillEnter } from "@ionic/react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { App } from "@capacitor/app"
import { getI18NText } from "../../i18n/i18n"

export default function WelcomePage()
{
    const { setPageDescription } = useContext(page_description_context)
    const { text: { welcome: text } } = getI18NText()

    useIonViewWillEnter(
        function ()
        {
            setPageDescription(text.page_description)
        }
    )

    setupHoveringButtons()

    return (<>
        <p>123</p>
    </>)
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const { dispatchHoveringButtonsChange } = useContext(hovering_buttons_changer_context)
    const { text: { welcome: text } } = getI18NText()

    function navigateTo(path: string)
    {
        router.push(path)
    }

    useIonViewWillEnter(
        function ()
        {
            console.log(`Setting up hovering buttons for "WelcomePage".`)
            dispatchHoveringButtonsChange({
                type: "clear_and_change",
                buttons: [
                    {
                        position: "upper_left",
                        content: (<p>Exit</p>),
                        aria_label: "Exit Application",
                        onclick: () => { console.log("Will exit app."); App.exitApp() }
                    },
                    {
                        position: "left",
                        content: (<p>Navigation</p>),
                        onclick: () => { navigateTo("/navigation"); console.log("Move to navigation page.") }
                    }
                ]
            })
        }
    )
}