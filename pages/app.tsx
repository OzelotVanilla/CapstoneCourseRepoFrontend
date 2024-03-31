import { setupIonicReact, IonApp, IonRouterOutlet, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import React, { Dispatch, SetStateAction, createContext, useContext, useReducer, useState } from "react";
import { default_hovering_buttons_states, hovering_button_positions } from "../util/const_store";
import WelcomePage from "./welcome/welcome.page";
import NavigationPage from "./navigation/navigation.page";
import VideoChatPage from "./video_chat/video_chat.page";
import SupporterPage from "./supporter/supporter.page";

import "./app.scss"


setupIonicReact();

export const page_description_context = createContext({
    page_description: "", setPageDescription: (() => { }) as Dispatch<SetStateAction<string>>
})
export const hovering_buttons_changer_context = createContext({
    hovering_buttons_states: default_hovering_buttons_states,
    dispatchHoveringButtonsChange: (() => { }) as Dispatch<ChangeHoveringButtonAction>
})

export default function App()
{
    return (<IonApp className="IonAppRoot"><AppContext>
        <AppRouter />
    </AppContext></IonApp>)
}

function AppContext({ children }: AppReactContext_Props)
{
    let [page_description, setPageDescription] = useState("")
    let [hovering_buttons_states, dispatchHoveringButtonsChange] = useReducer(
        changeHoveringButtonsFunc, default_hovering_buttons_states
    )

    return (<page_description_context.Provider value={{ page_description, setPageDescription }}>
        <hovering_buttons_changer_context.Provider value={{ hovering_buttons_states, dispatchHoveringButtonsChange }}>
            {children}
        </hovering_buttons_changer_context.Provider>
    </page_description_context.Provider>)
}

type AppReactContext_Props = {
    children: React.ReactNode
}

function AppRouter({ }: AppRouter_Props)
{
    return (<IonReactRouter>
        <IonRouterOutlet animated={false}>
            <Route exact path="/">{getPageForVisImpairedPeople(<WelcomePage />)}</Route>
            <Route exact path="/navigation">{getPageForVisImpairedPeople(<NavigationPage />)}</Route>
            <Route exact path="/voice_chat">{getPageForVisImpairedPeople(<VideoChatPage />)}</Route>
            <Route exact path="/supporter"><IonPage><SupporterPage /></IonPage></Route>
        </IonRouterOutlet>
    </IonReactRouter>)
}

type AppRouter_Props = {
}

function getPageForVisImpairedPeople(page: React.ReactNode)
{
    const { page_description } = useContext(page_description_context)
    const { hovering_buttons_states } = useContext(hovering_buttons_changer_context)

    return (<IonPage>
        <p id="page_description" aria-live="polite">{page_description}</p>
        <HoveringButtons button_states={hovering_buttons_states} />
        <div id="page_content">{page}</div>
    </IonPage>)
}

function HoveringButtons({ button_states }: HoveringButtons_Props)
{
    return (<div id="hovering_buttons" hidden={!button_states.visible}>
        {hovering_button_positions.map(
            position => (
                <div id={`${position}_button`} className="HoveringButton" key={position}
                    onClick={button_states[position].onclick} aria-label={button_states[position].aria_label}>
                    {button_states[position].content}
                </div>
            )
        )}
    </div>
    )
}

type HoveringButtons_Props = {
    button_states: HoveringButtonsState
}


function changeHoveringButtonsFunc(buttons_states: HoveringButtonsState, action: ChangeHoveringButtonAction): HoveringButtonsState
{
    switch (action.type)
    {
        case "default":
            {
                return default_hovering_buttons_states
            }

        case "change":
            {
                let result: Partial<Record<PossibleHoveringButtonPosition, HoveringButtonUnit>> = {}
                for (const changing_request of action.buttons)
                {
                    const button_changing = changing_request.position
                    let changed_part: HoveringButtonUnit = buttons_states[button_changing]
                    if (changing_request.onclick != undefined) { changed_part.onclick = changing_request.onclick }
                    if (changing_request.content != undefined) { changed_part.content = changing_request.content }
                    if (changing_request.aria_label != undefined) { changed_part.aria_label = changing_request.aria_label }

                    result[button_changing] = changed_part
                }

                return { ...buttons_states, ...result, visible: action.visible ?? buttons_states.visible }
            }

        case "clear_and_change":
            {
                return {
                    ...default_hovering_buttons_states,
                    ...Object.fromEntries(action.buttons.map(({ position, ...rest }) => ([position, rest]))),
                    visible: action.visible ?? buttons_states.visible
                }
            }

        default:
            {
                console.error(`Unsupported changeHoveringButtonsFunc`, action)
                throw TypeError(`Unsupported changeHoveringButtonsFunc action "${(action as { type: string }).type}" with above data.`)
            }
    }
}

type ChangeHoveringButtonAction =
    | { type: "default" }
    | { type: "change", buttons: ({ position: PossibleHoveringButtonPosition } & Partial<HoveringButtonUnit>)[], visible?: boolean }
    | { type: "clear_and_change", buttons: ({ position: PossibleHoveringButtonPosition } & Partial<HoveringButtonUnit>)[], visible?: boolean }

export type PossibleHoveringButtonPosition =
    | "upper_left" | "up" | "upper_right"
    | "left" | "middle" | "right"
    | "lower_left" | "down" | "lower_right"

export type HoveringButtonsState = {
    [button_position in PossibleHoveringButtonPosition]: HoveringButtonUnit
} & { visible: boolean }

export type HoveringButtonUnit = {
    onclick: () => any
    content: React.ReactNode
    aria_label: string
}