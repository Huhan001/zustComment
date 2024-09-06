import {Footer} from "../layout/Footer.tsx";
import {Container} from "../layout/Container.tsx";
import {HashtagList} from "./HashtagList.tsx";

const App = () => {
  return (
    <div className='app'>
      <Footer />
      <Container />
      <HashtagList />
    </div>
  )
}

export default App
