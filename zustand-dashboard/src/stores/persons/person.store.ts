import { type StateCreator, create } from "zustand";
import { firebaseStorage } from "../storages/firebase-storage";
import { devtools, persist } from "zustand/middleware";
// import { logger } from "../middlewares/logger.middlewares";

interface PersonStore {
    firstName: string;
    lastName: string;

}

interface Actions{
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonStore & Actions, [["zustand/devtools", never]]> = (set)=> ({
    firstName: '',
    lastName: '',

    setFirstName: (value: string) => set( ({ firstName: value }), false, 'setFirstName' ),
    setLastName: (value: string) => set( ({ lastName: value }), false, 'setLastName'),
})

export const usePersonStore = create<PersonStore & Actions>()( 
    // logger(
    devtools(
        persist(
            storeAPI
        , { 
            name: 'person-storage',
            // storage: customSessionStorage
            // storage: firebaseStorage
        })
    )
    //)   
);