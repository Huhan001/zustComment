import { useEffect } from "react";
import { TextStore } from "../store/TextStore";
import { ErrorMesage } from "../components/ErrorMesage";
import { Spinning } from "../style/Spinning";
import { feedback } from "../constants/constant";
import { TriangleUpIcon } from "@radix-ui/react-icons";


export const FeedbackList = () => {

    const response = TextStore(state => state.response);
    const isLoading = TextStore(state => state.loading);
    const FetchData = TextStore(state => state.FetchData)
    const errors = TextStore(state => state.errors)
    const filteredResponse = TextStore(state => state.filteredResponse)


    // load up new feedback typed by the user
    useEffect(() => {FetchData()},[]) // I have deleted the empty array in the useEffect hook to avoid infinite loop of fetching data


    return (
        <ol className='feedback-list'>
            {errors && <ErrorMesage mesage={errors} />}
            {isLoading  && <Spinning />}
            {(filteredResponse ?? response).map((data) => (<Feedback  key={data.id} {...data} />))}
        </ol>
    )
}

const Feedback = ({upvoteCount, badgeLetter, company, text, daysAgo,id}:feedback) =>  {
    const AddUpvote = TextStore(state => state.AddUpvote);
    return (
        <li className='feedback'>
                <button onClick={() => AddUpvote(id)}>
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
                <p>{daysAgo === 0? 'NEW' : `${daysAgo}d`}</p>
            </li>
    )
    
}