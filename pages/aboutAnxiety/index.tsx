import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import Image from 'next/image';

const IndexPage: Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center p-6 md:p-12">
      <Title>Anxiety Explained</Title>
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-3xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="p-8 md:p-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6">
            Understanding Anxiety
          </h1>
          <div className="w-full h-72 md:h-96 relative mb-8">
            <Image 
              src="/Looking-Up-Depression-.jpg" 
              alt="Understanding Anxiety" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Anxiety is a natural response to stress, often experienced as a feeling of worry, fear, or unease. While it&apos;s common to feel anxious occasionally, chronic or intense anxiety can affect daily life and mental health.
          </p>
          <ul className="text-left text-gray-700 mb-6 space-y-2 list-disc list-inside">
            <li><strong>Generalized Anxiety Disorder (GAD):</strong> Persistent worry about everyday matters, often without a specific cause.</li>
            <li><strong>Social Anxiety Disorder:</strong> Intense fear of social situations and being judged or embarrassed in public.</li>
            <li><strong>Panic Disorder:</strong> Recurring panic attacks, sudden episodes of intense fear and physical symptoms.</li>
            <li><strong>Phobias:</strong> Strong, irrational fear of specific objects, situations, or activities.</li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Anxiety disorders are treatable, often managed with therapy, medication, or lifestyle adjustments. Understanding anxiety&apos;s root causes, which can include genetics, environment, and life events, is a step toward finding effective treatment.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you or someone you know is struggling with anxiety, reaching out to a mental health professional can provide support and resources for managing symptoms and improving well-being.
          </p>
        </div>
      </div>
    </div>
  );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
