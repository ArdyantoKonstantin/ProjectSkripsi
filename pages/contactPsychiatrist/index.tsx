import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';

const IndexPage: Page = () => {
    return (
        <div>
            <Title>Contact</Title>
            This is The Contact Psychiatrist Page
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;