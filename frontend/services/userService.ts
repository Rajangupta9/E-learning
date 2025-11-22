import apiClient from './apiClient';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
    updateProfile: async (data: any) => {
        const response = await apiClient.put('/auth/profile', data);
        return response.data;
    },

    updatePassword: async (currentPassword: string, newPassword: string) => {
        const response = await apiClient.put('/auth/password', { currentPassword, newPassword });
        return response.data;
    },
};
