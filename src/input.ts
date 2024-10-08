import { DEBUG, DEBUG_DONT_BLOCK_INPUT } from "./autogenerated";

export const InputUp = 1;
export const InputRight = 2;
export const InputDown = 3;
export const InputLeft = 4;
export const InputB = 5;
export const InputA = 6;
export const InputUiOk = 7;
export const InputS = 8;
export const InputR = 9;
export const InputDebugA = 10;

const inputState: boolean[] = [];
let inputStateSnapshot: boolean[] = [];
let prevInputState: boolean[] = [];

let lockedUntilReleased = false;

let codes: any;

if (DEBUG) {
    codes = {
        "ArrowDown": InputDown,
        "ArrowUp": InputUp,
        "ArrowLeft": InputLeft,
        "ArrowRight": InputRight,

        "KeyS": InputDown,
        "KeyW": InputUp,
        "KeyA": InputLeft,
        "KeyD": InputRight,

        "KeyZ": InputUiOk,
        "KeyI": InputA,

        "KeyX": InputB,
        "KeyO": InputB,

        "Enter": InputUiOk,
        "Space": InputUiOk,

        "Digit1": InputDebugA,
    };
} else {
    codes = {
        "ArrowDown": InputDown,
        "ArrowUp": InputUp,
        "ArrowLeft": InputLeft,
        "ArrowRight": InputRight,

        "KeyS": InputDown,
        "KeyW": InputUp,
        "KeyA": InputLeft,
        "KeyD": InputRight,

        "KeyZ": InputUiOk,

        "Enter": InputUiOk,
        "Space": InputUiOk,
    };
}




export const lockUntilReleased = () => {
    lockedUntilReleased = isAnyKeyDown();
};

export const isLocked = () => lockedUntilReleased;

export const isAnyKeyDown = () => {
    for (let k in codes) {
        if (isInputDown(codes[k])) return true;
    }
    return false;
}

export const wasAnyKeyPressed = () => {
    for (let k in codes) {
        if (wasInputPressed(codes[k])) return true;
    }
    return false;
}

export const keyHandler = (event: KeyboardEvent, value: boolean) => {
    if (!event.repeat) {
        inputState[codes[event.code] || 0] = value;
    }

    if (!DEBUG_DONT_BLOCK_INPUT) {
        event.preventDefault();
    }

    if (!value && !isAnyKeyDown()) {
        lockedUntilReleased = false;
    }
}

export const inputUpdate = () => {
    prevInputState = [...inputStateSnapshot];
    inputStateSnapshot = [...inputState];
}

export const isInputDown = (key: number) => {
    return !lockedUntilReleased && inputState[key];
}

export const wasInputPressed = (key: number) => {
    return !lockedUntilReleased && !prevInputState[key] && inputStateSnapshot[key];
}

