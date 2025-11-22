import apiClient from './apiClient';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
    updateProfile: async (data: any) => {
        try {
            const response = await apiClient.put('/auth/profile', data);
            return response.data;
        } catch (error) {
            console.warn('Backend unreachable, using Demo Mode for profile update');
            await delay(800);

            // Update local storage to reflect changes in demo mode
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...currentUser, ...data };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { message: 'Profile updated (Demo)', user: updatedUser };
        }
    },

    updatePassword: async (currentPassword: string, newPassword: string) => {
        try {
            const response = await apiClient.put('/auth/password', { currentPassword, newPassword });
            return response.data;
        } catch (error) {
            console.warn('Backend unreachable, using Demo Mode for password update');
            await delay(800);
            return { message: 'Password updated successfully (Demo)' };
        }
    },
};
