import MainContainer from "@/src/components/MainContainer";
import NotificationList from "./NotificationList";

export default function Notice() {
    return (
        <MainContainer title="通知センター">
            <NotificationList />
        </MainContainer>
    );
}