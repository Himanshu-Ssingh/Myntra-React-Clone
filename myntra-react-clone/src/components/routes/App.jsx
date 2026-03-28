
import { Outlet } from 'react-router-dom'
import Header from '../Header'

import Footer from '../Footer'
import FetchItems from '../Fetchitems';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

// App component main layout hai jisme Header, Footer aur beech ka dynamic content hota hai
function App() {
  // Check kar rahe hain ki data currently load (fetch) ho raha hai ya nahi
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
      <Header />
      {/* FetchItems data lanne ke liye chalega lekkin screen pe kuch print nahi karega */}
      <FetchItems />
      {/* Agar data laya ja raha hai, toh spinner dikhao, nahi toh Outlet me baaki component (Home ya Bag) show karo */}
      {fetchStatus?.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </>
  );
}

export default App
