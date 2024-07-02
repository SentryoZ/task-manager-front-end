import {axiosInstance} from "@/lib/http";
import {toast} from "@/components/ui/use-toast";

export abstract class BaseModel {
    static readonly apiPath: string = ''
    public static async get() {
        try {
            const response = await axiosInstance.get(this.apiPath);
            return response.data
        } catch (e: any) {
            this.showErrorToast(e.response.data.message)
            return null
        }
    }

    public static async find(id: number){
        try {
            const response = await axiosInstance.get(this.apiPath + '/' + id);
            return response.data
        } catch (e: any) {
            this.showErrorToast(e.response.data.message)
            return null
        }
    }

    public static async create(data?: any) {
        try {
            const response = await axiosInstance.post(this.apiPath, data);
            return response.data
        } catch (e: any) {
            this.showErrorToast(e.response.data.message)
            return null
        }
    }

    public static async patch(id: number, data?: any) {
        try {
            const response = await axiosInstance.patch(this.apiPath + '/' + id, data);
            return response.data
        } catch (e: any) {
            this.showErrorToast(e.response.data.message)
            return null
        }
    }

    public static async delete(id: number){
        try {
            const response = await axiosInstance.delete(this.apiPath + '/' + id);
            return response.data
        } catch (e: any) {
            this.showErrorToast(e.response.data.message)
            return null
        }
    }

    private static showErrorToast(message: string) {
        toast({
            variant: "destructive",
            title: message
        })
    }
}