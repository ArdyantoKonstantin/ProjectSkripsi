import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import React, { useState } from 'react';

const FormSchema = z.object({
    GejalaA: z.string(),
    GejalaB: z.string(),
    GejalaC: z.string(),
    GejalaD: z.string(),
    GejalaE: z.string(),
    GejalaF: z.string(),
    GejalaG: z.string(),
    GejalaH: z.string(),
    GejalaI: z.string(),
    GejalaJ: z.string(),
});

type FormDataType = z.infer<typeof FormSchema>;

const IndexPage: Page = () => {

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema)
    });

    const [isNotDepressedModalOpen, setIsNotDepressedModalOpen] = useState(false);

    const [isDepressedModalOpen, setIsDepressedModalOpen] = useState(false);

    const handleOk = () => {
        setIsNotDepressedModalOpen(false);
        setIsDepressedModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsNotDepressedModalOpen(false);
        setIsDepressedModalOpen(false);
      };

    async function onSubmit(data: FormDataType) {
        const GejalaACF = 0.7;
        const GejalaBCF = 0.7;
        const GejalaCCF = 0.8;
        const GejalaDCF = 0.8;
        const GejalaECF = 0.6;
        const GejalaFCF = 0.3;
        const GejalaGCF = 0.7;
        const GejalaHCF = 0.5;
        const GejalaICF = 0.8;
        const GejalaJCF = 0.7;

        const GejalaAWeight = 0.15;
        const GejalaBWeight = 0.10;
        const GejalaCWeight = 0.10;
        const GejalaDWeight = 0.15;
        const GejalaEWeight = 0.10;
        const GejalaFWeight = 0.5;
        const GejalaGWeight = 0.5;
        const GejalaHWeight = 0.5;
        const GejalaIWeight = 0.20;
        const GejalaJWeight = 0.5;

        const skorGejalaA = GejalaACF * GejalaAWeight * parseInt(data.GejalaA);
        const skorGejalaB = GejalaBCF * GejalaBWeight * parseInt(data.GejalaB);
        const skorGejalaC = GejalaCCF * GejalaCWeight * parseInt(data.GejalaC);
        const skorGejalaD = GejalaDCF * GejalaDWeight * parseInt(data.GejalaD);
        const skorGejalaE = GejalaECF * GejalaEWeight * parseInt(data.GejalaE);
        const skorGejalaF = GejalaFCF * GejalaFWeight * parseInt(data.GejalaF);
        const skorGejalaG = GejalaGCF * GejalaGWeight * parseInt(data.GejalaG);
        const skorGejalaH = GejalaHCF * GejalaHWeight * parseInt(data.GejalaH);
        const skorGejalaI = GejalaICF * GejalaIWeight * parseInt(data.GejalaI);
        const skorGejalaJ = GejalaJCF * GejalaJWeight * parseInt(data.GejalaJ);

        const skorAkhir = skorGejalaA + skorGejalaB + skorGejalaC + skorGejalaD + skorGejalaE + skorGejalaF + skorGejalaG + skorGejalaH + skorGejalaI + skorGejalaJ
        if(skorAkhir >= 8){
            setIsNotDepressedModalOpen(true);
        }
        else if (skorAkhir < 8){
            setIsDepressedModalOpen(true);
        }
        
        console.log(skorAkhir);
    }

    return (
        <div>
            <Title>Test</Title>
            <h1 className='text-4xl mb-5'>Silahkan Isi Gejala Dibawah Ini Dari Skor 1 Hingga 10 Dimana Skor 10 adalah paling sesuai dan 10 paling tidak sesuai</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='GejalaA'>1. Sering merasa sedih, cemas, atau “kosong”</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaA' {...register('GejalaA')}></input>
                    <p className='text-red-500'>{errors['GejalaA']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaB'>2. Merasa tidak punya harapan, pesimis</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaB' {...register('GejalaB')}></input>
                    <p className='text-red-500'>{errors['GejalaB']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaC'>3. Merasa bersalah, tidak berharga, tidak akan tertolong</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaC' {...register('GejalaC')}></input>
                    <p className='text-red-500'>{errors['GejalaC']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaD'>4. Kehilangan selera atau kesenangan akan hal-hal yang biasanya menjadi kegemaran</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaD' {...register('GejalaD')}></input>
                    <p className='text-red-500'>{errors['GejalaD']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaE'>5. Energi yang melemah, merasa lelah, merasa “menjadi lamban”</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaE' {...register('GejalaE')}></input>
                    <p className='text-red-500'>{errors['GejalaE']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaF'>6. Sukar untuk berkonsentrasi, mengingat, dan membuat keputusan.</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaF' {...register('GejalaF')}></input>
                    <p className='text-red-500'>{errors['GejalaF']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaG'>7. Sulit tidur, terjaga pada waktu dini hari, atau terlalu banyak tidur</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaG' {...register('GejalaG')}></input>
                    <p className='text-red-500'>{errors['GejalaG']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaH'>8. Ada perubahan dalam hal selera makan dan/atau perubahan pada berat badan</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaH' {...register('GejalaH')}></input>
                    <p className='text-red-500'>{errors['GejalaH']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaI'>9. Memikirkan kematian atau bunuh diri, percobaan bunuh diri</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaI' {...register('GejalaI')}></input>
                    <p className='text-red-500'>{errors['GejalaI']?.message}</p>
                </div>
                <div>
                    <label htmlFor='GejalaJ'>10. Gelisah, mudah tersinggung</label>
                    <input type='number' max='10' min='1' className='mt-1 px-2 py-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' id='GejalaJ' {...register('GejalaJ')}></input>
                    <p className='text-red-500'>{errors['GejalaJ']?.message}</p>
                </div>
                <div className='mt-5'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'> <FontAwesomeIcon className='mr-2' icon={faChevronUp}></FontAwesomeIcon>
                        Submit
                    </button>
                </div>
            </form>
            <Modal title="You Are Not Depressed!" open={isNotDepressedModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Congratulations Looks Like You Are Depressed Free!!!!!!</p>
            </Modal>

            <Modal title="You Are Depressed" open={isDepressedModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>You are depressed better see a psychologist soon!!!!</p>
            </Modal>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;