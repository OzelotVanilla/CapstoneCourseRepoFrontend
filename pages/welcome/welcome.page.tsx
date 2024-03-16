import { useContext, useEffect } from "react"
import "./welcome.page.scss"
import { useIonRouter, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react"
import { hovering_buttons_changer_context, page_description_context } from "../app"
import { App } from "@capacitor/app"

export default function WelcomePage()
{
    setupHoveringButtons()

    return (<>
        <p>123</p>
    </>)
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const { dispatchHoveringButtonsChange } = useContext(hovering_buttons_changer_context)
    const { setPageDescription } = useContext(page_description_context)

    useIonViewWillEnter(
        function ()
        {
            console.log(`Setting up hovering buttons for "WelcomePage".`)
            // setPageDescription("New Description")
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
                        onclick: () => { router.push("/navigation"); console.log("Move to navigation page.") }
                    }
                ]
            })
        }
    )
}