import React from "react";
import { HoveringButtonUnit, HoveringButtonsState, PossibleHoveringButtonPosition } from "../pages/app";

const default_hovering_buttons_unit: HoveringButtonUnit = {
    onclick: () => { },
    content: React.createElement("div"),
    aria_label: ""
}

export const default_hovering_buttons_function: HoveringButtonsState = {
    upper_left: { ...default_hovering_buttons_unit },
    up: { ...default_hovering_buttons_unit },
    upper_right: { ...default_hovering_buttons_unit },
    left: { ...default_hovering_buttons_unit },
    middle: { ...default_hovering_buttons_unit },
    right: { ...default_hovering_buttons_unit },
    lower_left: { ...default_hovering_buttons_unit },
    down: { ...default_hovering_buttons_unit },
    lower_right: { ...default_hovering_buttons_unit }
}

export const hovering_button_positions: PossibleHoveringButtonPosition[] = [
    "upper_left", "up", "upper_right"
    , "left", "middle", "right"
    , "lower_left", "down", "lower_right"
] as const