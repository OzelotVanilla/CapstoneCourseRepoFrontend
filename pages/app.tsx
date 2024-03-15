import { setupIonicReact, IonApp, IonRouterOutlet, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import WelcomePage from "./welcome_page/welcome.page";
import React, { Dispatch, SetStateAction, createContext, useReducer, useState } from "react";

import "./app.scss"
import { default_hovering_buttons_function as default_hovering_buttons_onclick, hovering_button_positions } from "../util/const_store";


setupIonicReact();

export const page_description_setter_context = createContext<Dispatch<SetStateAction<string>>>(() => { })
export const hovering_buttons_changer_context = createContext<Dispatch<ChangeHoveringButtonAction>>(() => { })

export default function App()
{
    return (<IonApp className="IonAppRoot">
        <AppRouter />
    </IonApp>)
}

function AppContext({ children }: AppReactContext_Props)
{
    let [page_description, setPageDescription] = useState("")
    let [hovering_buttons_onclick, dispatchHoveringButtonsChange] = useReducer(
        changeHoveringButtonsFunc, default_hovering_buttons_onclick
    )

    function Contexts({ children }: { children: React.ReactNode })
    {
        return (
            <page_description_setter_context.Provider value={setPageDescription}>
                <hovering_buttons_changer_context.Provider value={dispatchHoveringButtonsChange}>
                    {children}
                </hovering_buttons_changer_context.Provider>
            </page_description_setter_context.Provider>
        )
    }

    return (<Contexts>
        <p id="page_description" aria-live="polite">{page_description}</p>
        <HoveringButtons button_states={hovering_buttons_onclick} />
        {children}
    </Contexts>)
}

type AppReactContext_Props = {
    children: React.ReactNode
}

function AppRouter({ }: AppRouter_Props)
{
    return (<IonReactRouter><IonRouterOutlet>
        <Route path="/">
            {getRoutablePage(<WelcomePage />)}
        </Route>
    </IonRouterOutlet></IonReactRouter>)
}

type AppRouter_Props = {
}

function getRoutablePage(page: React.ReactNode)
{
    return (<IonPage><AppContext>
        {page}
    </AppContext></IonPage>)
}

function HoveringButtons({ button_states }: HoveringButtons_Props)
{
    return (<div id="hovering_buttons">
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
                return default_hovering_buttons_onclick
            }

        case "change":
            {
                const button_changing = action.position
                let changed_part: HoveringButtonUnit = buttons_states[button_changing]
                if (action.onclick != undefined) { changed_part.onclick = action.onclick }
                if (action.content != undefined) { changed_part.content = action.content }
                if (action.aria_label != undefined) { changed_part.aria_label = action.aria_label }

                return { ...buttons_states, ...changed_part }
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
    | { type: "change", position: PossibleHoveringButtonPosition } & Partial<HoveringButtonUnit>

export type PossibleHoveringButtonPosition =
    | "upper_left" | "up" | "upper_right"
    | "left" | "middle" | "right"
    | "lower_left" | "down" | "lower_right"

export type HoveringButtonsState = {
    [button_position in PossibleHoveringButtonPosition]: HoveringButtonUnit
}

export type HoveringButtonUnit = {
    onclick: () => any
    content: React.ReactNode
    aria_label: string
}