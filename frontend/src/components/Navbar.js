import Link from 'next/link';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
  const items = [
    {
      label: 'Map',
      icon: 'pi pi-fw pi-map',
      command: () => { window.location.pathname = '/' }
    },
    {
      label: 'Locations List',
      icon: 'pi pi-fw pi-list',
      command: () => { window.location.pathname = '/locations' }
    }
  ];

  return (
    <Menubar model={items} />
  );
};

export default Navbar;
