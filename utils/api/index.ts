import { Props } from "next/script";
import { apiRoutes } from "./apiRoutes";

// type lang = "ar" | "en"

interface FetchSeoProps {
    slug: string;
}

interface FetchProps {
    body: any,
    url: string,
}

export const fetchSeo = async ({ slug }: FetchSeoProps) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ slug }); // Include lang in the request body

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            cache: "no-cache",
        };

        const url = process.env.BACKEND_URL + '/api/seo';

        // console.log("SEO:", url);


        const response = await fetch(url, requestOptions);
        const result = await response.json();

        return result?.data || {};
    } catch (error) {
        return {};
    }
};

// export const fetchNewsAndAnouncement = async ({ slug, lang, url }: any) => {
//     try {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const raw = JSON.stringify({ slug, lang });

//         const requestOptions: RequestInit = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };


//         const response = await fetch(url, requestOptions)
//         const result = await response.json()

//         return result?.data || {}
//     } catch (error) {
//         return {}
//     }
// }


export const fetchData = async ({ url, body }: FetchProps) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ ...body });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            cache: "no-cache",
        };

        // console.log(url);


        const response = await fetch(url, requestOptions)
        const result = await response.json()
        return result?.data || {}
    } catch (error) {
        return {}
    }
}