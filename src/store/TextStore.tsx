import { create } from "zustand";
import { feedback } from "../constants/constant";


interface textStore {
    text: string;
    response: feedback[];
    setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    TextCount: () => number;
    FetchData: () => Promise<void>; // This is a promise that returns an array of feedback
    loading: boolean;
    errors: string | null;
    PostText: () => Promise<void>;
    AddUpvote: (id:number) => void;
    hashtags: (word:string) => void;
}

export const TextStore = create<textStore>()((set, get) => {
    return {
        text: '',
        response:[],
        errors: null,
        loading:false,
        setText: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            // if(get().TextCount() > Max_Characters) return;
            set({text: event.target.value})
        },
        TextCount: () => get().text.length,
        FetchData: async () => {
            try {
                set({loading: true, errors: null});
                const calls = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
                const data = await calls.json();
                set({response: data.feedbacks, loading: false});
            } catch (e) {
                set({errors: `network error: ${e}`, loading: false});
            }
        },
        PostText: async () => {
            const newItem: feedback = {
                text: get().text,
                upvoteCount: 0,
                daysAgo: 0,
                company: get().text.split(/\s/).find(word => word.includes('#'))!.substring(1),
                badgeLetter: get().text.split(/\s/).find(word => word.includes('#'))!.substring(1,2).toUpperCase(),
                id: new Date().getMilliseconds()
            }

            set({response: [...get().response, newItem]}); // This is to update the UI with the new feedback

            await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        },
        AddUpvote : async (id:number) => {
            set((state) => ({response: state.response.map(data => data.id === id ? {...data, upvoteCount: data.upvoteCount + 1} : data)}));
            
            const upvote = get().response.find(data => data.id === id)
            await fetch(`https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks/` + id, {
                method: 'PUT',
                body: JSON.stringify(upvote),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            console.log(upvote)
        },
        hashtags: (word:string) =>  
            set((state) => ({response: state.response.filter(data => data.company === word && data )}))
    }
})
