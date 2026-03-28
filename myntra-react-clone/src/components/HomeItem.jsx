import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

// Ye component homepage par ek individual product card render karta hai
const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  // Check kar rahe hain ki current item already bag mein add hai ya nahi
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0;

  // Jab user "Add to Bag" click kare, toh ye item id Redux list mein save kar deta hai
  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  // Jab user "Remove" click kare, toh ye item Redux list se delete (remove) ho jata hai
  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="item-container">
      <img className="item-image" src={item.image} alt="item image" />
      <div className="rating">
        {item.rating.stars} ⭐ | {item.rating.count}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>
      <div className="price">
        <span className="current-price">Rs {item.current_price}</span>
        <span className="original-price">Rs {item.original_price}</span>
        <span className="discount">({item.discount_percentage}% OFF)</span>
      </div>

      {elementFound ? (
        <button
          type="button"
          className="btn btn-add-bag btn-danger"
          onClick={handleRemove}
        >
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default HomeItem;