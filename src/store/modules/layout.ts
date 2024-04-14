import { defineStore } from 'pinia';
import { piniaPersist } from '@/config/piniaPersist';
import themeConfig from '@/config/theme';
import { GlobalState } from '../interface';
export const useLayoutStore = defineStore(
	'layout',
	() => {
		let globalState = ref<GlobalState>(themeConfig);
		const setGlobalState = (...args: ObjKeyOfArray<GlobalState>) => {
			globalState.value[args[0] as string] = args[1];
		};

		return {
			...toRefs(globalState.value),
			setGlobalState,
		};
	},
	{
		persist: piniaPersist({ key: 'layout' }),
	},
);
