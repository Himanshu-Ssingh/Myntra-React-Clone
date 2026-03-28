import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

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
      .then((res) => res.json())
      .then(({ items }) => {
        // Data aane ke baad status ko done aur finished mark karte hain
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        // Aur data ko items array me save kar dete hain
        dispatch(itemsActions.addInitialItems(items[0]));
      });

    // Cleanup function - agar component unmount ho jaye toh ongoing request ko cancel kar do
    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;