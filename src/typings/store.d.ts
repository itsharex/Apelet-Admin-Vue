/// <reference types="vite/client" />

import { UserInfo } from '@/api/login/types';

declare global {
    interface TabsMenuState {
        icon: string;
        name: string;
        path: string;
        title: string;
        isFixed?: boolean;
        isCache?: boolean;
    }

    interface AppState {
        isCollapse: boolean;
        isMobile: boolean;
        reload: boolean;
        language: string;
    }

    interface UserState {
        token: string;
        userInfo: UserInfo;
    }
}
