import { TextStore } from "../store/TextStore";

export const HashtagList = () => {
    const recordedTexts = TextStore(state => state.response);
    const hashtag = TextStore(state => state.hashtags); 

    return (
        <ul className='hashtags'>
            {recordedTexts.map(data => data.text.split(/\s/).filter(word => word.includes('#')).map((word, index) => <li key={index}>
                <button onClick={() => hashtag(word)}>{word}</button></li>))}
        </ul>
    )
}