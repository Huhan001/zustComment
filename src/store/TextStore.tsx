import { create } from "zustand";
import { Max_Characters } from "../constants/constant";


interface textStore {
    text: string,
    setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    TextCount: () => number
}

export const TextStore = create<textStore>((set, get) => {
    return {
        text: '',
        setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if(get().TextCount() > Max_Characters) return;
            set({text: event.target.value})
        },
        TextCount: () => get().text.split(/\s/).filter(word => word !== "").length
    }
})