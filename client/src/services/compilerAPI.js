import { $authHost } from "./index";

export const executeScript = async(stateForm) => {
    const { data } = await $authHost.post('/api/compiler/run', stateForm);
    return data;
}