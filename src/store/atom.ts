// src/recoil/authState.ts
import { atom, selector } from 'recoil';

export const authState = atom<boolean>({
    key: 'authState',
    default: false,    // true if user is logged in
});

export const userState = atom<{ name: string; email: string } | null>({
    key: 'userState',
    default: null,     // stores logged-in user info
});

// Example selector to get the user's name (empty if not set)
export const userNameSelector = selector<string>({
    key: 'userNameSelector',
    get: ({ get }) => {
        const user = get(userState);
        return user ? user.name : '';
    },
});
