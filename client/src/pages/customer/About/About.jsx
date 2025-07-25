import React from 'react';
import './About.css';
import cherry_tomato from '../../../assets/cherry_tomato.png';
import baki from '../../../assets/baki.jpg';
import salad2 from '../../../assets/salad2.jpg';
import logo2 from '../../../assets/logo2.png';
import logo_itb from '../../../assets/logo_itb.png';
import logo_lpik from '../../../assets/logo_lpik.png';
import logo_p2mw from '../../../assets/logo_p2mw.png';
import logo_kmi from '../../../assets/logo_kmi.png';
import logo_ptc from '../../../assets/logo_ptc.png';
import team3 from '../../../assets/team3.jpg';
import team4 from '../../../assets/team4.jpg';
import hero from '../../../assets/hero.jpg';
import { LocationOn } from '@mui/icons-material';
import dandimuzaki from '../../../assets/dandimuzaki.png';
import fathia from '../../../assets/fathia.png';
import danur from '../../../assets/danur.png';
import toby from '../../../assets/toby.png';
import fikri from '../../../assets/fikri.png';
import haydar from '../../../assets/haydar.jpeg';
import Footer from '../../../components/customer/Footer/Footer';

const About = () => {
  return (
    <div>
      <section className='about-grid pt-20 px-15 pb-15 gap-2 text-[var(--black)] h-screen'>
        <div className='about bg-[var(--light-turquoise)] about-item p-5 flex flex-col items-start justify-center'>
          <h2 className='font-bold'>Who Are We</h2>
          <p className='text-xl font-bold mb-5'>Agricultural Pest Predator Cultivator</p>
          <p>We’re growers, collaborators, and caretakers. Born out of a passion for honest food and healthy soil, our team connects local farms with conscious consumers.</p>
        </div>
        <div className='team about-item'>
        </div>
        <div className='about-img-1 about-item'>
          <img src={baki} className='h-full w-full object-cover' />
        </div>
        <div className='about-img-2 about-item'>
          <img src={salad2} className='h-full w-full object-cover' />
        </div>
        <div className='about-img-3 about-item'>
          <img src={cherry_tomato} className='h-full w-full object-cover' />
        </div>
      </section>
      <section className='vision gap-10 px-15 py-10 text-white'>
        <div className='vision-3'>
          <img src={logo2} className='h-full w-full object-cover' />
        </div>
        <div className='vision-2'>
          <p className='font-bold text-3xl mb-5'>Our Mission</p>
          <p>At Agripacul, we are passionate about growing fresh, chemical-free produce. Nestled in the heart of nature, our farm uses sustainable farming practices to protect the environment and deliver the healthiest food to your table. Every seed we plant is a step toward a greener, healthier future.</p>
        </div>
        <div className='vision-1'>
          <p className='font-bold text-3xl mb-5'>Our Vision</p>
          <p className='font-bold text-5xl'>LET'S KEEP AGRICULTURE SUSTAINABLE</p>
        </div>

      </section>
      <div className='achievement p-15 gap-2'>
        <div className='flex bg-[var(--light-turquoise)] p-5 flex-col justify-center row-span-2 achievement-item'>
          <p className='font-bold text-3xl'>Growing Strong, Achieving More</p>
          <p>
            We are an agriculture startup from Institut Teknologi Bandung founded in 2022. Supported by Lembaga Pengembangan Inovasi dan Kewirausahaan (LPiK ITB), we committed to implement integrated and eco-friendly farming practices — reducing chemical input, reusing organic waste, and promoting biodiversity.
          </p>
          <div className='flex gap-3'>
            <img src={logo_itb} className='h-10' />
            <img src={logo_lpik} className='h-10' />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center px-5 achievement-item'>
          <div className='flex gap-3'>
            <img src={logo_p2mw} className='h-10' />
            <img src={logo_kmi} className='h-10' />
          </div>
          <p className='text-center font-bold'>Awardee of Program Pembinaan Mahasiswa Wirausaha dan Kewirausahaan Mahasiswa Indonesia Expo</p>
        </div>
        <div className='overflow-hidden achievement-item'>
          <img src={team3} className='w-full aspect-5/3 object-cover' />
        </div>
        <div className='overflow-hidden achievement-item'>
          <img src={team4} className='w-full aspect-5/3 object-cover' />
        </div>
        <div className='flex flex-col items-center justify-center px-5 achievement-item'>
          <div><img src={logo_ptc} className='h-15' /></div>
          <p className='text-center font-bold'>Awardee of Planned Technopreneurship Program</p>
        </div>
      </div>
      <section className='mb-15 farm gap-x-2 gap-y-5 px-15'>
        <p className='farm-title font-bold text-3xl'>Visit Our Farm</p>
        <div className='farm-img'><img src={hero} className='w-full h-full object-cover rounded-lg' /></div>
        <p className='farm-desc pr-10'>Come and explore how we grow your food — with care, innovation, and sustainability. Our farm is open for visits, offering a firsthand look at our integrated practices, healthy crops, and community-driven approach. Whether you're curious about growing techniques or just want to enjoy the fresh air, you're welcome here.</p>
        <div className='farm-location flex justify-center items-center text-[var(--red)] flex-col gap-3'>
          <LocationOn fontSize='large' />
          <p className='text-white text-center font-bold px-5'>
            Jl. Cisintok Kadumulya, Cihanjuang, Kec. Parongpong, Kabupaten Bandung Barat
          </p>
        </div>
        <button className='farm-btn px-4 py-2 bg-[var(--teal)] rounded-full text-white active:bg-[var(--dark-teal)] w-fit cursor-pointer font-bold'>Schedule a Tour</button>
      </section>
      <section className='bg-[var(--light-turquoise)] member p-15 gap-y-5 gap-x-2'>
        <div className='col-span-6 flex justify-center'><p className='px-2 py-1 border border-2 border-[var(--red)] text-[var(--red)] text-sm w-fit rounded-full'>Our Team</p></div>
        <h2 className='text-center col-span-6'>Meet the Hands and Hearts Behind Our Farm</h2>
        <div className='rounded-lg overflow-hidden relative'>
          <img src={dandimuzaki} className='w-full h-full object-cover' />
          <p className='name'>Dandi Muhamad Zaki</p>
        </div>
        <div className='rounded-lg overflow-hidden relative'>
          <img src={haydar} className='w-full h-full object-cover left-0' />
          <p className='name'>Haydar Alfan Nur</p>
        </div>
        <div className='rounded-lg overflow-hidden relative'>
          <img src={danur} className='w-full h-full object-cover' />
          <p className='name'>Danur Wenda</p>
        </div>
        <div className='rounded-lg overflow-hidden relative'>
          <img src={toby} className='w-full h-full object-cover' />
          <p className='name'>Jeremia Toby</p>
        </div>
        <div className='rounded-lg overflow-hidden relative'>
          <img src={fikri} className='w-full h-full object-cover' />
          <p className='name'>Fikri Sabilal Huda</p>
        </div>
        <div className='rounded-lg overflow-hidden relative'>
          <img src={fathia} className='w-full h-full object-cover' />
          <p className='name'>Fathia Mahira Sjoekri</p>
        </div>
        <div className='text-center col-span-6 flex justify-center mt-10'><div className='text-white items-center items-center font-bold rounded-full w-fit py-1 pl-4 pr-1 flex gap-5 bg-[var(--red)]'>Interested in joining our mission?<button className='cursor-pointer px-4 py-1 bg-white text-[var(--red)] rounded-full'>Work with Us</button></div></div>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
