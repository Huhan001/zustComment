import { create } from "zustand";
import { Max_Characters } from "../constants/constant";
import { feedback } from "../constants/constant";


interface textStore {
    text: string;
    response: feedback[];
    setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    TextCount: () => number;
    FetchData: () => Promise<void>; // This is a promise that returns an array of feedback
    loading: boolean;
    errors: string | null;
}

export const TextStore = create<textStore>()((set, get) => {
    return {
        text: '',
        response:[],
        errors: null,
        loading:false,
        setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if(get().TextCount() > Max_Characters) return;
            set({text: event.target.value})
        },
        TextCount: () => get().text.split(/\s/).filter(word => word !== "").length,
        FetchData: async () => {
            try {
                set({loading: true, errors: null});
                const calls = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
                const data = await calls.json();
                set({response: data.feedbacks, loading: false});
            } catch (e) {
                set({errors: 'An error occurred while fetching data', loading: false});
            }
        },
    }
})