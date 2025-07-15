import { useEffect, useState } from "react";
import { getMostVisitedUnits } from "../services/visitorservice";

const useMostVisitedUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchUnits = async () => {
    try {
      const data = await getMostVisitedUnits();
      setUnits(data);
    } catch (error) {
   
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchUnits();
}, []);


  return { units, loading };
};

export default useMostVisitedUnits;
