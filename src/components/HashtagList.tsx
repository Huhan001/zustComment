import { TextStore } from "../store/TextStore";

export const HashtagList = () => {
    const recordedTexts = TextStore(state => state.response);

    return (
        <ul className='hashtags'>
            {recordedTexts.map(data => data.text.split(/\s/).filter(word => word.includes('#')).map((word, index) => <li key={index}><button>{word}</button></li>))}
        </ul>
    )
}