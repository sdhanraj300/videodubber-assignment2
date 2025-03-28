import { create } from "zustand";

const useMediaStore = create((set) => ({
  mediaFiles: [],
  currentTime: 0,
  duration: 10,
  isPlaying: false,
  position: { x: 50, y: 50 },
  size: { width: 300, height: 200 },

  addMedia: (media) =>
    set((state) => ({
      mediaFiles: [...state.mediaFiles, media],
      duration: media.type === "video" ? media.endTime : 10,
      currentTime: 0,
      isPlaying: false,
    })),

  updateMedia: (id, updates) =>
    set((state) => ({
      mediaFiles: state.mediaFiles.map((media) =>
        media.id === id ? { ...media, ...updates } : media
      ),
    })),

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setPosition: (x, y) => set({ position: { x, y } }),
  setSize: (width, height) => set({ size: { width, height } }),
}));

export default useMediaStore;
