// VAPI Configuration
export const VAPI_CONFIG = {
    API_KEY: '67f1ed6e-95d0-4a19-acfe-25b50563b9c4',
    // Add any other VAPI configuration options here
} as const;

// Helper function to get VAPI key
export const getVapiKey = () => VAPI_CONFIG.API_KEY; 