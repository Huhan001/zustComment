import {TriangleUpIcon} from "@radix-ui/react-icons";
import { feedback} from '../constants/constant';
import { TextStore } from "../store/TextStore";
import { Spinning } from "../style/Spinning";
import { useEffect } from "react";


export const FeedbackList = () => {

    const response = TextStore(state => state.response);
    const isLoading = TextStore(state => state.loading);
    const FetchData = TextStore(state => state.FetchData)

    useEffect(() => {FetchData()},[]) // I have deleted the empty array in the useEffect hook to avoid infinite loop of fetching data


        return (
        <ol className='feedback-list'>
            {isLoading  && <Spinning />}
            {response.map((data) => (<Feedback  key={data.id} {...data} />))}
        </ol>
    )
}

const Feedback = ({upvoteCount, badgeLetter, company, text, daysAgo}:feedback) =>  {
    return (
        <li className='feedback'>
                <button>
                    <TriangleUpIcon />
                    <span>{upvoteCount}</span>
                </button>
                <div>
                    <p>{badgeLetter}</p>
                </div>

                <div>
                    <p>{company}</p>
                    <p>{text}</p>
                </div>
                <p>{daysAgo}d</p>
            </li>
    )
    
}