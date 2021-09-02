import axios from "axios";
import notify from "@/utils/notification";

export async const ApiFactory = (options) => {
    
    let headers = {};
    let opt = {
        url,
        method: options.method || "GET",
        headers: options.absoluteHeaders
          ? options.headers || {}
          : { ...headers, ...(options.headers || {}) },
        // mode:'no-cors',
        data: options.body,
      };
    
    try{
        const response = await axios(opt)
        return response;    
    } catch(error){
        switch(er.response.status){
            case 403:
                const type = "Error";
                const title = "Authorization";
                const message = "You don't have privillage to do this action!";
                const response = {"type":type , "title":title, "message": message};
                throw response; 
            case 401:
                localStorage.removeItem("oauth");
                window.location = "/login"
                break;
            default:
                const response = {...error.response.data}
                throw response;
        }
    }


}