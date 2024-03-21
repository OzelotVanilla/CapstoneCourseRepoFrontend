import { useIonRouter, useIonViewWillEnter } from "@ionic/react"
import { useContext } from "react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { getI18NText } from "../../i18n/i18n"

import "./video_chat.page.scss"

export default function VideoChatPage()
{
    setupHoveringButtons()

    const { setPageDescription } = useContext(page_description_context)
    const { text: { video_chat: text } } = getI18NText()

    // console.log(`Media device: `, navigator.mediaDevices)

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: true })
        .then(
            media_stream =>
            {
                console.log(`Media stream got: `, media_stream)
            }
        )

    useIonViewWillEnter(
        function ()
        {
            setPageDescription(text.page_description)
        }
    )

    return (<>
    </>)
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const { dispatchHoveringButtonsChange } = useContext(hovering_buttons_changer_context)
    const { text: { video_chat: text } } = getI18NText()

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