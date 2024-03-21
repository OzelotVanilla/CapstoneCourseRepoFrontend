import { useIonRouter, useIonViewWillEnter } from "@ionic/react"
import "./navigation.page.scss"
import { useContext } from "react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { getI18NText } from "../../i18n/i18n"

export default function NavigationPage()
{
    setupHoveringButtons()

    const { setPageDescription } = useContext(page_description_context)
    const { text: { navigation: text } } = getI18NText()

    useIonViewWillEnter(
        function ()
        {
            setPageDescription(text.page_description)
        }
    )

    return (<>
        <p>456</p>
    </>)
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const { dispatchHoveringButtonsChange } = useContext(hovering_buttons_changer_context)

    useIonViewWillEnter(
        function ()
        {
            dispatchHoveringButtonsChange({
                type: "clear_and_change",
                buttons: [
                    {
                        position: "upper_left",
                        content: (<p>Back</p>),
                        aria_label: "Go back to welcome page.",
                        onclick: () => { router.goBack(); console.log("Go back") }
                    }
                ]
            })
        }
    )
}