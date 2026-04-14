import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from './AuthContext';
import { createFarm, getMyFarms, updateFarm } from '../api/farmApi';
import { getCropsByFarm } from '../api/cropApi';

const FarmContext = createContext(null);

export const FarmProvider = ({ children }) => {
  const { auth } = useAuth();

  const [farm, setFarm] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFarmData = useCallback(async () => {
    if (!auth) {
      setFarm(null);
      setCrops([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const farms = await getMyFarms();

      if (farms && farms.length > 0) {
        // Use the first farm (most users will have one)
        const activeFarm = farms[0];
        setFarm(activeFarm);

        // Load crops for this farm
        const farmCrops = await getCropsByFarm(activeFarm.farmId);
        setCrops(farmCrops || []);
      } else {
        // No farm yet — auto-create a default one for new users
        const newFarm = await createFarm({
          farmName: `${auth.user.name}'s Farm`,
          location: 'Not set',
          areaSize: 0,
          userId: auth.user.userId,
        });
        setFarm(newFarm);
        setCrops([]);
      }
    } catch (error) {
      console.error('Failed to load farm data:', error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    loadFarmData();
  }, [loadFarmData]);

  const refreshCrops = async () => {
    if (!farm) return;
    try {
      const farmCrops = await getCropsByFarm(farm.farmId);
      setCrops(farmCrops || []);
    } catch (error) {
      console.error('Failed to refresh crops:', error);
    }
  };

  const updateFarmDetails = async (updatedFields) => {
    if (!farm) return;
    try {
      const updatedFarm = await updateFarm(farm.farmId, { ...farm, ...updatedFields });
      setFarm(updatedFarm);
      return updatedFarm;
    } catch (error) {
      console.error('Failed to update farm:', error);
      throw error;
    }
  };

  return (
    <FarmContext.Provider value={{ farm, crops, setCrops, loading, refreshCrops, updateFarmDetails }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => useContext(FarmContext);