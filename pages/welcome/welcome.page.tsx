import { useContext, useRef, useState } from "react"
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

    let go_to_support_mode = useRef(false)

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
                        content: (<p>{text.button__exit}</p>),
                        aria_label: text.button__exit,
                        onclick: () => { console.log("Will exit app."); App.exitApp() }
                    },
                    {
                        position: "left",
                        content: (<p>{text.button__navigation}</p>),
                        aria_label: text.button__navigation,
                        onclick: () => { navigateTo("/navigation"); console.log("Move to navigation page.") }
                    },
                    {
                        position: "right",
                        content: (<p>{text.button__video_chat}</p>),
                        aria_label: text.button__video_chat,
                        onclick: () => { navigateTo("/voice_chat"); console.log("Move to voice chat page.") }
                    },
                    {
                        position: "upper_right",
                        content: (<p>{text.button__supporter_mode}</p>),
                        aria_label: text.aria_label__supporter_mode_warning,
                        onclick: function ()
                        {
                            if (go_to_support_mode.current == false)
                            {
                                console.log("Going to unlock supporter mode")
                                go_to_support_mode.current = true
                            }
                            else
                            {
                                go_to_support_mode.current = false
                                navigateTo("/supporter")
                                console.log("Moving to supporter mode.")
                            }
                        }
                    }
                ]
            })
        }
    )
}