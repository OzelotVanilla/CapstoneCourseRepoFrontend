import { IonTitle, useIonRouter, useIonViewWillEnter } from "@ionic/react"
import { useContext, useState } from "react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { getI18NText } from "../../i18n/i18n"

import "./supporter.page.scss"

export default function SupporterPage()
{
    setupHoveringButtons()

    const { setPageDescription } = useContext(page_description_context)
    const { text: { supporter: text } } = getI18NText()

    useIonViewWillEnter(
        function ()
        {
        }
    )

    return (<></>)
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const { dispatchHoveringButtonsChange } = useContext(hovering_buttons_changer_context)
    const { text: { supporter: text } } = getI18NText()

    useIonViewWillEnter(
        function ()
        {
            dispatchHoveringButtonsChange({
                type: "clear_and_change",
                buttons: [
                ],
                visible: false
            })
        }
    )
}

type NavigationDestination = string