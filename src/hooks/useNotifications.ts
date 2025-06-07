import { useEffect, useState } from "react";

export const useNotifications = () => {
    const [permission, setPermission] =
        useState<NotificationPermission>("default");

    useEffect(() => {
        // Check current permission
        if ("Notification" in window) {
            setPermission(Notification.permission);

            // Request notification permission on component mount
            if (Notification.permission === "default") {
                Notification.requestPermission().then((permission) => {
                    console.log("Notification permission:", permission);
                    setPermission(permission);
                });
            }
        }
    }, []);

    const showNotification = (title: string, body: string) => {
        console.log("Attempting to show notification:", {
            title,
            body,
            permission,
        });

        if ("Notification" in window) {
            if (permission === "granted") {
                try {
                    const notification = new Notification(title, {
                        body,
                        icon: "/vite.svg",
                        badge: "/vite.svg",
                        tag: "pomodoro-test",
                        requireInteraction: true,
                        silent: false,
                    });

                    console.log(
                        "Notification created successfully:",
                        notification
                    );

                    notification.onclick = () => {
                        console.log("Notification clicked");
                        notification.close();
                    };

                    notification.onerror = (error) => {
                        console.error("Notification error:", error);
                    };

                    return notification;
                } catch (error) {
                    console.error("Failed to create notification:", error);
                }
            } else if (permission === "default") {
                console.log("Requesting notification permission...");
                Notification.requestPermission().then((newPermission) => {
                    console.log("New permission:", newPermission);
                    setPermission(newPermission);
                    if (newPermission === "granted") {
                        showNotification(title, body);
                    }
                });
            } else {
                console.warn("Notifications are denied");
            }
        } else {
            console.error("Notifications not supported");
        }
    };

    const testNotification = () => {
        if (permission === "denied") {
            alert(
                '❌ 브라우저 알림이 차단되어 있습니다.\n\n해결 방법:\n1. 브라우저 주소창 왼쪽의 🔒 아이콘 클릭\n2. "알림" 설정을 "허용"으로 변경\n3. 페이지를 새로고침하고 다시 시도해주세요.'
            );
            return;
        }
        showNotification(
            "🧪 Test Notification",
            "This is a test notification to check if it works on Mac!"
        );
    };

    const getPermissionStatus = () => {
        switch (permission) {
            case "granted":
                return { status: "허용됨 ✅", color: "text-green-600" };
            case "denied":
                return { status: "차단됨 ❌", color: "text-red-600" };
            case "default":
                return { status: "대기중 ⏳", color: "text-yellow-600" };
            default:
                return { status: "알 수 없음", color: "text-gray-600" };
        }
    };

    const requestPermission = async () => {
        if ("Notification" in window && permission !== "granted") {
            try {
                const newPermission = await Notification.requestPermission();
                setPermission(newPermission);
                return newPermission;
            } catch (error) {
                console.error("Permission request failed:", error);
                return "denied";
            }
        }
        return permission;
    };

    return {
        showNotification,
        testNotification,
        requestPermission,
        getPermissionStatus,
        permission,
        isSupported: "Notification" in window,
    };
};
