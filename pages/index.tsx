import { Button } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';
import { useRouter } from 'next/router';
const IndexPage: Page = () => {
    const router = useRouter();
    const handleClick = () => {
        // Use router.push to navigate to another page
        router.push('/testDepression');
      };
    return (
        <div className="bg-cover" style={{ backgroundImage: 'url(a_helping_hand.jpg)' }}>
            <Title>Home</Title>
            <div className='xl:pt-40 xl:pl-32 pb-52 lg:pt-40 lg:pl-16 md:pl-8 md:pt-40 sm:pl-2 sm:pt-40 pl-16 pt-20'>
                <p className="pb-1 text-3xl font-bold lg:text-6xl lg:pb-3 text-blue-700">Halo,</p>
                <p className="pb-3 text-3xl font-bold lg:text-6xl lg:pb-4 text-blue-700">Apakah Anda Mengalami Depresi?</p>
                <div className="border-l-2 border-blue-500 mt-4 pl-2 lg:mb-11">
                    <p className="lg:text-sm text-[12px] ml-1 text-blue-500">Mari Mulai Tes</p>
                    <p className="lg:text-sm text-[12px] ml-1 text-blue-500">Apakah Anda Membutuhkan Pertolongan Atau Tidak? </p>
                </div>
                <p className="text-sm font-bold lg:text-lg pb-3">Silahkan Klik Tombol Dibawah ini</p>
                <Button className='bg-white px-5 pb-5 hover:bg-transparent lg:pb-9 lg:pt-2 sm:bg-cover' type="default" onClick={handleClick}>
                    <p className="text-[#3788FD] font-bold lg:text-lg sm:text-[8px] sm:mt-1.25 lg:mt-0">Mulai Tes</p>
                </Button>
            </div>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
