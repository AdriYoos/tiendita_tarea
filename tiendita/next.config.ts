import type { NextConfig } from "next";
import { hostname } from "os";


const nextConfig: NextConfig = {
 images: {
   remotePatterns:
     [
       {
         protocol: "https",
         hostname: "i.abcnewsfe.com"
       },
       {
         protocol: "https",
         hostname: "raw.githubusercontent.com"
       },
       {
        protocol:"https",
        hostname:"images.api-onepiece.com"
       },
       {
        protocol:"https",
        hostname:"www.freepik.es"
       },
       {
        protocol:"https",
        hostname:"static.wikia.nocookie.net"
       }
     ]
 }
 
};


export default nextConfig;
