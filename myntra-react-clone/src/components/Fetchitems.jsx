import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const DEFAULT_ITEMS = [
  {
    id: "001", image: "images/1.jpg", company: "Carlton London", item_name: "Rhodium-Plated CZ Floral Studs",
    original_price: 1045, current_price: 606, discount_percentage: 42, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 4.5, count: 1400 }
  },
  {
    id: "002", image: "images/2.jpg", company: "CUKOO", item_name: "Women Padded Halter Neck Swimming Dress",
    original_price: 2599, current_price: 1507, discount_percentage: 42, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 4.3, count: 24 }
  },
  {
    id: "003", image: "images/3.jpg", company: "NUEVOSDAMAS", item_name: "Women Red & White Printed A-Line Knee-Length Skirts",
    original_price: 1599, current_price: 495, discount_percentage: 69, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 4.1, count: 249 }
  },
  {
    id: "004", image: "images/4.jpg", company: "ADIDAS", item_name: "Indian Cricket ODI Jersey",
    original_price: 999, current_price: 999, discount_percentage: 0, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 5, count: 10 }
  },
  {
    id: "005", image: "images/5.jpg", company: "Roadster", item_name: "Pure Cotton T-shirt",
    original_price: 1399, current_price: 489, discount_percentage: 65, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 4.2, count: 3500 }
  },
  {
    id: "006", image: "images/6.jpg", company: "Nike", item_name: "Men ReactX Running Shoes",
    original_price: 14995, current_price: 14995, discount_percentage: 0, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 0, count: 0 }
  },
  {
    id: "007", image: "images/7.jpg", company: "The Indian Garage Co", item_name: "Men Slim Fit Regular Shorts",
    original_price: 1599, current_price: 639, discount_percentage: 60, rating: { stars: 4.2, count: 388 }
  },
  {
    id: "008", image: "images/8.jpg", company: "Nivea", item_name: "Men Fresh Deodrant 150ml",
    original_price: 285, current_price: 142, discount_percentage: 50, return_period: 14, delivery_date: "10 Oct 2023", rating: { stars: 4.2, count: 5200 }
  }
];


// Ye component backend se items ka data fetch karta hai aur background me run hota hai
const FetchItems = () => {
  // Redux store se current fetch operation ka status le rahe hain
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  // Jab bhi component load ho, useEffect backend par API call karta hai
  useEffect(() => {
    // Agar items pehle se hi fetch ho chuke hain, toh wapas fetch nahi karega
    if (fetchStatus.fetchDone) return;

    // API calls ko cancel karne ke liye AbortController use ho raha hai
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetch start ho gaya hai, ye status update kar rahe hain
    dispatch(fetchStatusActions.markFetchingStarted());
    fetch("http://localhost:8080/items", { signal })
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(({ items }) => {
        // Data aane ke baad status ko done aur finished mark karte hain
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        // Aur data ko items array me save kar dete hain
        dispatch(itemsActions.addInitialItems(items[0]));
      })
      .catch((err) => {
        // Jab production (Vercel) me localhost backend na chale, toh error pakad kar fallback items pass kardo
        console.warn("Backend band hai ya error aaya, ab local dummy data use kar rahe hain...", err);
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsActions.addInitialItems(DEFAULT_ITEMS));
      });

    // Cleanup function - agar component unmount ho jaye toh ongoing request ko cancel kar do
    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;