import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, StatusBar, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

interface WebViewContainerProps {
    url: string;
}

export default function WebViewContainer({ url }: WebViewContainerProps) {
    const webviewRef = useRef<WebView>(null);
    const [loading, setLoading] = useState(true);
    const [canGoBack, setCanGoBack] = useState(false);
    const hasLoadedOnce = useRef(false);

    useEffect(() => {
        const backAction = () => {
            if (canGoBack && webviewRef.current) {
                webviewRef.current.goBack();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [canGoBack]);

    return (
        <SafeAreaView style={styles.container}>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="hsl(0 74% 28%)" />
                </View>
            )}
            <WebView
                ref={webviewRef}
                source={{ uri: url }}
                style={styles.webview}
                onLoadStart={(navState) => {
                    // Only show the native loading overlay on the very first load.
                    // Subsequent internal Next.js navigations (even to root) should use the web app's own loaders.
                    if (!hasLoadedOnce.current) {
                        setLoading(true);
                    }
                }}
                onLoadEnd={() => {
                    setLoading(false);
                    hasLoadedOnce.current = true;
                }}
                onNavigationStateChange={(navState) => {
                    setCanGoBack(navState.canGoBack);
                }}
                onError={(e) => {
                    console.error("WebView Error:", e.nativeEvent)
                    setLoading(false);
                    hasLoadedOnce.current = true;
                }}
                onHttpError={(e) => {
                    console.error("WebView HTTP Error:", e.nativeEvent)
                    setLoading(false);
                    hasLoadedOnce.current = true;
                }}
                startInLoadingState={true}
                scalesPageToFit={true}
                bounces={false}
                allowsBackForwardNavigationGestures={true}
                pullToRefreshEnabled={true}
                mixedContentMode="always"
                userAgent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
                originWhitelist={['*']}
                sharedCookiesEnabled={true}
                cacheEnabled={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsl(30 20% 97%)',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(30 20% 97%)',
        zIndex: 1,
    },
});
