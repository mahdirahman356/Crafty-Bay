/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';

const HomePage = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen text-black">
  <div className="hero-content flex-col lg:flex-row mt-24">
      <Image
        src="https://i.ibb.co/qs876MS/estee-janssens-MUf7-Ly04s-OI-unsplash.jpg"
        alt="A description of the image"
        width={400}
        height={300}
        className='hidden lg:grid'
      />
      
    <div className=''>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">Creative <span className='text-secondary'>Crafts</span></h1>
      <div className="hero lg:-ml-28">
  <div className="hero-content flex-col md:flex-row gap-10">
  <Image
        src="https://i.ibb.co/L5DfpGK/swapnil-dwivedi-w46t-RF64q-Nc-unsplash.jpg"  // Corrected URL
        alt="A description of the image"
        width={300}
        height={200}
      />
    <div>
      <p className="py-6 text-sm text-gray-600">
      Unleash your creativity and explore beautifully crafted items for every occasion at CraftyBay. We connect you with talented artisans who pour passion into each piece. Whether you’re seeking unique gifts, home decor, or personal treasures, our curated selection offers something special that adds charm to your life.      </p>
    </div>
  </div>
</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default HomePage;