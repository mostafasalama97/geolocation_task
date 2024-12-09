import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 

  const rows = 10;

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations`)
      .then((response) => {
        const locationsWithId = response.data.features.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setLocations(locationsWithId);
        setTotalRecords(locationsWithId.length);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const filteredLocations = locations.filter((location) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesScore = location.properties.score
      .toString()
      .includes(searchLower);
    const matchesName = location.properties.name
      .toLowerCase()
      .includes(searchLower);
    return matchesScore || matchesName; 
  });

  useEffect(() => {
    setTotalRecords(filteredLocations.length);
  }, [filteredLocations]);

  const currentData = filteredLocations.slice(
    currentPage * rows,
    (currentPage + 1) * rows
  );

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  return (
    <div className="p-m-4">
  <div className="m-4">
    <strong style={{ fontSize: '40px' }}>Kuyua </strong>
    <span style={{ fontSize: '32px', opacity: '0.5' }}>ALL LOCATIONS</span>
  </div>
  
  <div className="p-grid p-ai-center p-mb-3">
    <div
      className="p-col-12 p-md-6"
      style={{
        width: '25%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginRight: '10px',
        padding: '10px 10px',
      }}
    >
      <label htmlFor="search" style={{ marginRight: '8px' , fontSize: '24px' }}>Search</label>
      <i
        className="pi pi-search search-icon"
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'black',
          pointerEvents: 'none',
        }}
      ></i>
      <InputText
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by score or name"
        style={{
          flexGrow: 1,
          borderRadius: '50px',
          paddingLeft: '40px',
        }}
      />
    </div>
  </div>

  <DataTable 
    value={currentData} 
    paginator={false} 
    rows={rows} 
    sortMode="multiple"
    rowClassName={() => 'black-row'} 
    tableStyle={{ width: '100%' , border: '1px solid black' , marginTop: '20px' , height: '70vh' }}
  >
    <Column field="id" header="ID" style={{ color: 'white' }} headerStyle={{ color: 'black' }}></Column>
    <Column field="properties.name" header="Name" sortable style={{ color: 'green' }} headerStyle={{ color: 'black' }}></Column>
    <Column field="properties.score" header="Score" sortable style={{ color: 'white' }} headerStyle={{ color: 'black' }}></Column>
    <Column field="properties.address" header="Address" style={{ color: 'white' }} headerStyle={{ color: 'black' }}></Column>
  </DataTable>

  <div className="p-mt-3 flex justify-content-end align-items-center" style={{ display: 'flex', gap: '10px' }}>
  <Paginator
    first={currentPage * rows}
    rows={rows}
    totalRecords={filteredLocations.length} 
    onPageChange={onPageChange}
  />
  <div style={{ fontSize: '16px', color: 'black' }}>
    <span>
    Page total: <strong>{currentData.length * (currentPage + 1)}</strong> of <strong>{filteredLocations.length}</strong>
    </span>
  </div>
</div>

  
</div>

  );
};

export default Locations;
