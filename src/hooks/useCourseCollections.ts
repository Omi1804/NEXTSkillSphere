"use client";

import { useCallback, useEffect, useState } from "react";

const CART_KEY = "eLearniCart";
const WISHLIST_KEY = "eLearniWishlist";
const COLLECTION_EVENT = "eLearniCollectionsChanged";
const LEGACY_CART_KEY = "skillSphereCart";
const LEGACY_WISHLIST_KEY = "skillSphereWishlist";

type CollectionKey = typeof CART_KEY | typeof WISHLIST_KEY;

const readCollection = (key: CollectionKey) => {
  if (typeof window === "undefined") return [];

  try {
    const legacyKey = key === CART_KEY ? LEGACY_CART_KEY : LEGACY_WISHLIST_KEY;
    const rawValue = window.localStorage.getItem(key) || window.localStorage.getItem(legacyKey) || "[]";
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
};

const writeCollection = (key: CollectionKey, ids: string[]) => {
  const legacyKey = key === CART_KEY ? LEGACY_CART_KEY : LEGACY_WISHLIST_KEY;
  window.localStorage.setItem(key, JSON.stringify(Array.from(new Set(ids))));
  window.localStorage.removeItem(legacyKey);
  window.dispatchEvent(new Event(COLLECTION_EVENT));
};

export const useCourseCollections = () => {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const sync = useCallback(() => {
    setCartIds(readCollection(CART_KEY));
    setWishlistIds(readCollection(WISHLIST_KEY));
  }, []);

  useEffect(() => {
    const syncTimer = window.setTimeout(sync, 0);
    window.addEventListener(COLLECTION_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.clearTimeout(syncTimer);
      window.removeEventListener(COLLECTION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const addToCart = (courseId: string) => {
    writeCollection(CART_KEY, [...readCollection(CART_KEY), courseId]);
  };

  const removeFromCart = (courseId: string) => {
    writeCollection(
      CART_KEY,
      readCollection(CART_KEY).filter((id) => id !== courseId),
    );
  };

  const clearCart = () => {
    writeCollection(CART_KEY, []);
  };

  const toggleWishlist = (courseId: string) => {
    const wishlist = readCollection(WISHLIST_KEY);
    const nextWishlist = wishlist.includes(courseId)
      ? wishlist.filter((id) => id !== courseId)
      : [...wishlist, courseId];

    writeCollection(WISHLIST_KEY, nextWishlist);
  };

  const removeFromWishlist = (courseId: string) => {
    writeCollection(
      WISHLIST_KEY,
      readCollection(WISHLIST_KEY).filter((id) => id !== courseId),
    );
  };

  return {
    cartIds,
    wishlistIds,
    addToCart,
    removeFromCart,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    isInCart: (courseId: string) => cartIds.includes(courseId),
    isWishlisted: (courseId: string) => wishlistIds.includes(courseId),
  };
};
