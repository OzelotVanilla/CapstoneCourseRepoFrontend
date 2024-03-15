import { useContext, useEffect } from "react"
import "./welcome.scss"
import { NavContext, useIonRouter, useIonViewDidEnter } from "@ionic/react"
import { hovering_buttons_changer_context } from "../app"

export default function WelcomePage()
{
    setupHoveringButtons()

    return (<>
    </>)
}

function setupHoveringButtons()
{
    const router = useIonRouter()
    const dispatchHoveringButtonsChange = useContext(hovering_buttons_changer_context)
    useIonViewDidEnter(
        function ()
        {
            dispatchHoveringButtonsChange({
                type: "change",
                position: "upper_left",
                content: (<p>Back</p>),
                onclick: () => { router.goBack(); console.log("Go back") }
            })
        }
    )
}