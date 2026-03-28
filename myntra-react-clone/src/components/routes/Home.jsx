import HomeItem from "../HomeItem";
import { useSelector } from "react-redux";

// Ye component homepage hai jo saare items ko grid ya list mein display karta hai
const Home = () => {
  // Store se sare loaded items access kar rahe hain
  const items = useSelector((store) => store.items);

  return (
    <main>
      <div className="items-container">
        {/* array (items) par map chalakar har ek item ke liye ek "HomeItem" component render kar rahe hain */}
        {items.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;