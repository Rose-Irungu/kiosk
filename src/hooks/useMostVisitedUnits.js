import { useEffect, useState } from "react";
import { getMostVisitedUnits } from "../services/visitorservice";

const useMostVisitedUnits = (filter = "today") => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await getMostVisitedUnits(filter);
    
        setUnits(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching most visited units:", error);
        setUnits([]); 
        setError("Failed to load units");
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, [filter]);

  return { units, loading, error };
};
export default useMostVisitedUnits;
