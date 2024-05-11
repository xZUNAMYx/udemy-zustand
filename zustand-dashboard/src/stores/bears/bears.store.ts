import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bear{
    id:number,
    name: string,
}

interface BearState{
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    bears: Bear[];

    totalBears: () => number;

    increaseBlackBear: ( by: number ) => void;
    increasePolarBear: ( by: number ) => void;
    increasePandaBear: ( by: number ) => void;

    doNothing: () => void;
    addBear: () => void;
    clearBear: () => void;
}

export const useBearStore = create<BearState>()(
    
    persist(

        (set, get) => ({
            blackBears: 10,
            polarBears: 1,
            pandaBears: 5,

            bears: [ {id:1, name: 'Bear#1'} ],

            totalBears():number {
                return get().blackBears + get().pandaBears + get().polarBears + get().bears.length;
            },

            increaseBlackBear: ( by: number ) => set((state) => ({ blackBears: state.blackBears + by })),
            increasePolarBear: ( by: number ) => set((state) => ({ polarBears: state.polarBears + by })),
            increasePandaBear: ( by: number ) => set((state) => ({ pandaBears: state.pandaBears + by })),

            doNothing: () => set( state => ({bears: [...state.bears]})),
            addBear: () => set( state => ({
                bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`}]
            })),
            clearBear: () => set( {bears: []} )
        }),
        { name: 'bears-store' }
    )

);