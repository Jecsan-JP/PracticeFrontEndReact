import { SwalManager } from "../../domain/models/SwalManager";
import HttpAxiosManager from "../../http/HttpAxiosManager";
import { HttpManager } from "../../http/HttpManager";
import { SwalDataManager } from "../../lib/SweetAlert2/SwalDataManager";

const swalManagerInstance = new SwalDataManager();
export const swalDataManager: () => SwalManager = () => swalManagerInstance;

export const http: HttpManager = new HttpAxiosManager(
    import.meta.env.VITE_URL_BASE ?? ""
);
