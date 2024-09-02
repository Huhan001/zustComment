import { Max_Characters } from "../constants/constant";
import { TextStore } from "../store/TextStore"

export const FeedbackForm = () => {

    // const text = TextStore(state => state.text);
    // const setText = TextStore(state => state.setText);
    // const TextCount = TextStore(state => state.TextCount);

    const {text, setText, TextCount} = TextStore();
    const count = TextCount();

    return (
        <form className='form'>
            <textarea value={text} onChange={setText} id = 'feedback-textarea' placeholder='what is it?' spellCheck={false}/>

            <label htmlFor='feedback-textarea'>
                Enter your feedback here, remember to #hastag the company
            </label>

            <div>
                <p className='u-italic'>{Max_Characters - count}</p>
                <button>
                    <span>Submit</span>
                </button>
            </div>
        </form>
    )
}