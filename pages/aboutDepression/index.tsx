import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { Image } from "antd";

const IndexPage: Page = () => {
    return (
        <div>
            <Title>About Depression</Title>
            <p className="pb-1 text-3xl font-bold lg:text-6xl lg:pb-3 text-black">An Overview Of Depression</p>
            <Image alt='' width={1000} src='Looking-Up-Depression-.jpg'/>
            <p>Depression is a mental health disorder characterized by persistent feelings of sadness, hopelessness, and disinterest in activities that one typically enjoys. It can affect how you think, feel, and handle daily activities, and it may also lead to various emotional and physical problems. Symptoms of depression can vary widely among individuals but often include:</p>
            <p> 1. Persistent sadness or emptiness </p>
            <p> 2. Loss of interest or pleasure in activities once enjoyed </p>
            <p> 3. Changes in appetite or weight </p>
            <p> 4. Sleep disturbances (insomnia or oversleeping) </p>
            <p> 5. Fatigue or loss of energy </p>
            <p> 6. Feelings of worthlessness or guilt </p>
            <p> 7. Difficulty concentrating or making decisions </p>
            <p> 8. Thoughts of death or suicide </p>
            <p> Depression can vary in severity, ranging from mild to severe, and it can be triggered by various factors such as genetic predisposition, brain chemistry, life events, trauma, or other medical conditions. It&apos;s essential to seek help from a mental health professional if you or someone you know is experiencing symptoms of depression, as it&apos;s a treatable condition with various therapeutic approaches and medications available.





</p>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;