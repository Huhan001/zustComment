import { Logo } from "../components/Logo"
import { PageHeading } from "../components/PageHeading"
import { Pattern } from "../components/Pattern"
import { FeedbackForm } from "../feedback/FeedbackForm"


export const Header = () => {
    return (
        <header>
            <Pattern />
            <Logo />
            <PageHeading />
            <FeedbackForm />
        </header>
    )
}