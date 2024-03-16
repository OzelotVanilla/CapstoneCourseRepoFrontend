import { useIonRouter, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react"
import "./navigation.page.scss"
import { useContext } from "react"
import { hovering_buttons_changer_context } from "../app"

export default function NavigationPage()
{
    setupHoveringButtons()
    console.log("nav")

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