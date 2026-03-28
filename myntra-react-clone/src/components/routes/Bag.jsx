import BagItem from "../BagItem";
import BagSummary from "../BagSummary";
import { useSelector } from "react-redux";

// Ye component Shopping Bag (Cart) ka main page hai, jab user "/bag" pe jata hai tab ye open hota hai
const Bag = () => {
  // Jo items cart me dale gaye hain unki list (IDs) le rahe hain
  const bagItems = useSelector((state) => state.bag);
  // Saare products le rahe hain
  const items = useSelector((state) => state.items);
  
  // actual data filter kar rahe hain un products ke liye jo bag mein hain
  const finalItems = items.filter((item) => {
    const itemIndex = bagItems.indexOf(item.id);
    return itemIndex >= 0;
  });

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {finalItems.map((item) => (
            <BagItem item={item} />
          ))}
        </div>
        <BagSummary />
      </div>
    </main>
  );
};

export default Bag;