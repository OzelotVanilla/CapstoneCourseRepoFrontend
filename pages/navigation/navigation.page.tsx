import { IonTitle, useIonRouter, useIonViewWillEnter } from "@ionic/react"
import { useContext, useState } from "react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { getI18NText } from "../../i18n/i18n"

import "./navigation.page.scss"

export default function NavigationPage()
{
    setupHoveringButtons()

    const { setPageDescription } = useContext(page_description_context)
    const { text: { navigation: text } } = getI18NText()

    let [navigation_destination, setNavigationDestinatio] = useState<null | NavigationDestination>(null)

    useIonViewWillEnter(
        function ()
        {
            setPageDescription(text.page_description)
        }
    )

    // User has selected the destination, and the navigation should start now.
    if (navigation_destination != null)
    {
        return (<>
            <IonTitle aria-hidden={true}>{text.navigation_running}</IonTitle>
        </>)
    }
    else // User just finished a navigation, or just entered the page 
    {
        return (<>
            <IonTitle aria-hidden={true}>{text.navigation_waiting_input}</IonTitle>
        </>)
    }
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const { dispatchHoveringButtonsChange } = useContext(hovering_buttons_changer_context)
    const { text: { navigation: text } } = getI18NText()

    useIonViewWillEnter(
        function ()
        {
            dispatchHoveringButtonsChange({
                type: "clear_and_change",
                buttons: [
                    {
                        position: "upper_left",
                        content: (<p>{text.button__back}</p>),
                        aria_label: text.button__back,
                        onclick: () => { router.goBack(); console.log("Go back") }
                    }
                ]
            })
        }
    )
}

type NavigationDestination = string