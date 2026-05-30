const EGG_STORAGE_KEY = "memory_egg_egg";

const defaultEgg = {
  egg_id: 1,
  user_id: 1,
  stage: 1,
  glow: 0,
  warmth: 0,
  weight: 0,
  active_background_id: null,
  active_music_id: null,
  active_decoration_id: null,
  updated_at: new Date().toISOString(),
};

function loadEggFromStorage() {
  const savedEgg = localStorage.getItem(EGG_STORAGE_KEY);

  if (!savedEgg) {
    localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(defaultEgg));
    return defaultEgg;
  }

  const parsedEgg = JSON.parse(savedEgg);

  if (!parsedEgg || typeof parsedEgg !== "object") {
    localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(defaultEgg));
    return defaultEgg;
  }

  return parsedEgg;
}

function saveEggToStorage(egg) {
  localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(egg));
}

function clampStat(value) {
  return Math.max(0, Math.min(100, value));
}

function calculateStage({ glow, warmth, weight }) {
  const average = (glow + warmth + weight) / 3;

  if (average >= 80) {
    return 4;
  }

  if (average >= 55) {
    return 3;
  }

  if (average >= 30) {
    return 2;
  }

  return 1;
}

function calculateStatsFromPosts(posts) {
  const tagCounts = posts.reduce(
    (counts, post) => {
      const tag = post.tag;

      return {
        ...counts,
        [tag]: (counts[tag] || 0) + 1,
      };
    },
    {}
  );

  return {
    glow: clampStat((tagCounts.study || 0) * 5),
    warmth: clampStat((tagCounts.reflection || 0) * 3),
    weight: clampStat((tagCounts.food || 0) * 5),
  };
}

export async function getEgg() {
  return loadEggFromStorage();
}

export async function recalculateEggStatsFromPosts(posts) {
  const egg = loadEggFromStorage();
  const calculatedStats = calculateStatsFromPosts(posts);

  const updatedEgg = {
    ...egg,
    glow: calculatedStats.glow,
    warmth: calculatedStats.warmth,
    weight: calculatedStats.weight,
    stage: calculateStage(calculatedStats),
    updated_at: new Date().toISOString(),
  };

  saveEggToStorage(updatedEgg);

  return updatedEgg;
}

export async function equipEggItem({ itemType, itemId }) {
  const egg = loadEggFromStorage();

  const equipFieldByType = {
    background: "active_background_id",
    music: "active_music_id",
    decoration: "active_decoration_id",
  };

  const fieldName = equipFieldByType[itemType];

  if (!fieldName) {
    throw new Error("Invalid egg item type.");
  }

  const updatedEgg = {
    ...egg,
    [fieldName]: itemId,
    updated_at: new Date().toISOString(),
  };

  saveEggToStorage(updatedEgg);

  return updatedEgg;
}