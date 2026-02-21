import React from 'react';
import { Platform } from 'react-native';
import WebViewContainer from '../components/WebViewContainer';

export default function AppIndex() {
    // If testing on a physical device, this should be the IPv4 address of your computer running the Next.js server.
    // Based on your Expo logs, your network IP seems to be 192.168.1.36.
    const defaultUrl = 'http://192.168.1.36:3000';
    const appUrl = process.env.EXPO_PUBLIC_APP_URL || defaultUrl;

    return <WebViewContainer url={appUrl} />;
}
