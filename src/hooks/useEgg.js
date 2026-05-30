import { useCallback, useEffect, useState } from "react";
import {
  equipEggItem,
  getEgg,
  recalculateEggStatsFromPosts,
} from "../api/eggApi";

export function useEgg() {
  const [egg, setEgg] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadEgg = useCallback(async () => {
    setLoading(true);

    const data = await getEgg();

    setEgg(data);
    setLoading(false);

    return data;
  }, []);

  const recalculateFromPosts = useCallback(async (posts) => {
    const updatedEgg = await recalculateEggStatsFromPosts(posts);

    setEgg(updatedEgg);

    return updatedEgg;
  }, []);

  const equipItem = useCallback(async ({ itemType, itemId }) => {
    const updatedEgg = await equipEggItem({ itemType, itemId });

    setEgg(updatedEgg);

    return updatedEgg;
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialEgg() {
      const data = await getEgg();

      if (!ignore) {
        setEgg(data);
        setLoading(false);
      }
    }

    loadInitialEgg();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    egg,
    loading,
    reloadEgg,
    recalculateFromPosts,
    equipItem,
  };
}