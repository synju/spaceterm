import {create} from 'zustand';

// Create the Zustand store
const useStore = create((set) => ({
	user: null,
	setUser: (user) => set({ user }),

	currentPage: 'Empire', // Default value for currentPage
	setCurrentPage: (page) => set({ currentPage: page }),

	userPlanets:null,
	setUserPlanets: (planets) => set({userPlanets:planets}),
	currentPlanet: null, // Default value for currentPlanet
	setCurrentPlanet: (planet) => set({currentPlanet:planet}),
}));

// Persist the state to localStorage
useStore.subscribe((state) => {
	localStorage.setItem('zustand-store', JSON.stringify(state));
}, (state) => [state.user, state.currentPage]); // Track specific slices of the state

// Hydrate the state from localStorage on app start
const storedState = JSON.parse(localStorage.getItem('zustand-store'));
if (storedState) {
	useStore.setState(storedState);
}

export default useStore;