import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "io.ionic.starter",
    appName: "CapstoneCourseRepoFrontend",
    webDir: "dist",
    server: {
        hostname: "localhost",
        androidScheme: "https"
    }
};

export default config;
