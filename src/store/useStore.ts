/**
 * @component Zustand Store
 * @description Zustand 状态管理
 * @time 2025/12/25
 * @author Mike.Cai
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DemoState {
    count: number;
    message: string;
    user: {
        name: string;
        role: string;
    } | null;
    // Actions
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setMessage: (message: string) => void;
    setUser: (user: { name: string; role: string } | null) => void;
}

export const useStore = create<DemoState>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                count: 0,
                message: '欢迎使用 Zustand 状态管理',
                user: null,

                // Actions
                increment: () => set((state) => ({ count: state.count + 1 })),
                decrement: () => set((state) => ({ count: state.count - 1 })),
                reset: () => set({ count: 0 }),
                setMessage: (message: string) => set({ message }),
                setUser: (user) => set({ user }),
            }),
            {
                name: 'demo-storage', // localStorage key
            }
        ),
        {
            name: 'DemoStore', // DevTools name
        }
    )
);
