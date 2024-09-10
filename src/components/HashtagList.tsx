import { TextStore } from "../store/TextStore";
import {useEffect} from "react";

export const HashtagList = () => {
    const companyCollector= TextStore(state => state. companyCollector);
    const CompanyListView = TextStore(state => state.CompanyListView);
    const response = TextStore(state => state.response)
    const hashtag = TextStore(state => state.hashtagFilter);


//    useEffect is for data and API retrival while useMemo is for inside data calculation
    useEffect(() => {
        companyCollector()
    },[response])


    return (
        <ul className='hashtags'>
            {
                CompanyListView.map((word, index) =>
                    <li key={index}>
                <button onClick={() => hashtag(word)}>#{word}</button>
                    </li>)
            }

        </ul>
    )
}