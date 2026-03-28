import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { bagActions } from "../store/bagSlice";

// Ye component shopping bag (cart) mein ek single item ko dikhane ke liye use hota hai
const BagItem = ({ item }) => {
  // useDispatch hook se hum Redux store mein actions bhej sakte hain
  const dispatch = useDispatch();

  // Ye function item ko bag se hatane (remove) ka action trigger karta hai
  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={item.image} />
      </div>
      <div className="item-right-part">
        <div className="company">{item.company}</div>
        <div className="item-name">{item.item_name}</div>
        <div className="price-container">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount-percentage">
            ({item.discount_percentage}% OFF)
          </span>
        </div>
        <div className="return-period">
          <span className="return-period-days">{item.return_period} days</span>{" "}
          return available
        </div>
        <div className="delivery-details">
          Delivery by
          <span className="delivery-details-days">{item.delivery_date}</span>
        </div>
      </div>

      <div className="remove-from-cart" onClick={handleRemoveItem}>
        <RiDeleteBin5Fill />
      </div>
    </div>
  );
};

export default BagItem;