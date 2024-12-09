import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// const Map = dynamic(() => import('../components/Map'), { ssr: false });
// const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });
// const MapboxExample = dynamic(() => import('../components/MapboxExample'), { ssr: false });
const MapComponent = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
     return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div className='m-4'>
  <strong style={{fontSize: '40px'}}>Kuyua </strong><span style={{fontSize: '32px' , opacity: '0.5'}}>DASHBOARD</span>
  </div>
           <div style={{ flex: 1 }}>
          <MapComponent />
        </div>
      </div>
  );
};

export default Home;
