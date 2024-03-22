import { IonTitle, useIonRouter, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react"
import { MutableRefObject, useContext, useRef, useState } from "react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { getI18NText } from "../../i18n/i18n"

import "./video_chat.page.scss"

export default function VideoChatPage()
{
    const { setPageDescription } = useContext(page_description_context)
    const { text: { video_chat: text } } = getI18NText()
    const media_stream = useRef<MediaStream | null>(null)
    const media_stream_status = useRef<MediaStreamRequestingStatus>("not_requested")
    const [_, setPageUpdateIndicator] = useState(false)
    const updatePage = () => setPageUpdateIndicator(v => !v)
    const getMediaStreamStatus = () =>
    {
        if (media_stream.current != null) { return text.chat_status__ongoing }
        else
        {
            switch (media_stream_status.current)
            {
                case "not_requested": return text.chat_status__not_requested
                case "requesting": return text.chat_status__requesting
                case "failed": return text.chat_status__failed
            }
        }
    }

    setupHoveringButtons({ media_stream, media_stream_status, updatePage })

    // console.log(`Media device: `, navigator.mediaDevices)

    useIonViewWillEnter(
        function ()
        {
            setPageDescription(text.page_description)
        }
    )

    // Close the camera and mic if in use (when user decide to leave this page).
    useIonViewWillLeave(
        function ()
        {
            media_stream.current?.getTracks().forEach(track => track.stop())
        }
    )

    return (<>
        <IonTitle>{text.page_title}</IonTitle>
        <p>{getMediaStreamStatus()}</p>
        <video id="video_chat__video" muted={true} />
    </>)
}

function setupHoveringButtons({ media_stream, media_stream_status, updatePage }: setupHoveringButtons_Args)
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
                    },
                    {
                        position: "right",
                        content: (<p>{text.button__request}</p>),
                        aria_label: text.button__request,
                        onclick: () =>
                        {
                            media_stream_status.current = "requesting"
                            updatePage()
                            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: true })
                                .then(
                                    media_stream_got =>
                                    {
                                        console.log(`Media stream got: `, media_stream_got)
                                        media_stream.current = media_stream_got
                                        const video_elem = document.getElementById("video_chat__video") as HTMLVideoElement
                                        if (video_elem != null) { video_elem.srcObject = media_stream_got; video_elem.play() }
                                        updatePage()
                                    }
                                )
                                .catch(
                                    reason =>
                                    {
                                        media_stream_status.current = "failed"
                                    }
                                )
                        }
                    }
                ]
            })
        }
    )
}

type setupHoveringButtons_Args = {
    media_stream: MutableRefObject<MediaStream | null>
    media_stream_status: MutableRefObject<MediaStreamRequestingStatus>
    updatePage: () => any
}

/** The status for requesting of the media stream */
type MediaStreamRequestingStatus =
    | "not_requested"
    | "requesting"
    | "failed"