import { StateStorage, createJSONStorage } from "zustand/middleware";

const storageAPI: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        const data = sessionStorage.getItem(name)

        return data;
    },

    setItem: function (name: string, value: string): unknown/*:void */ {
        sessionStorage.setItem(name, value);
    },

    removeItem: function (name: string): unknown /*:void | Promise<void>*/ {
        console.log('removeItem', name);
    }
}

export const customSessionStorage = createJSONStorage( ()=> storageAPI);