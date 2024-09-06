import { Max_Characters } from "../constants/constant";
import { TextStore } from "../store/TextStore"

export const FeedbackForm = () => {

    // const text = TextStore(state => state.text);
    // const setText = TextStore(state => state.setText);
    // const TextCount = TextStore(state => state.TextCount);

    const {text, setText, TextCount, PostText} = TextStore();
    const count = TextCount();

    const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        TextStore.setState({text: ''});  // I have changed the text to an empty string to clear the textarea after submission
    }
    return (
        <form onSubmit={handleSubmission} className='form'>
            <textarea value={text} onChange={setText} id = 'feedback-textarea' placeholder='what is it?' spellCheck={false}/>

            <label htmlFor='feedback-textarea'>
                Enter your feedback here, remember to #hastag the company
            </label>

            <div>
                <p className='u-italic'>{Max_Characters - count}</p>
                <button onClick={PostText} disabled= {count > Max_Characters? true : false} >
                    <span>Submit</span>
                </button>
            </div>
        </form>
    )
}