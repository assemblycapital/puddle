import { default as React } from 'react';

interface HalfChatProps {
    onServiceMessage?: (msg: any) => void;
    onClientMessage?: (msg: any) => void;
    Element?: React.ComponentType<{}>;
    processName: string;
    ourNode: string;
    websocketUrl?: string;
    enableChatSounds?: boolean;
    paramServiceId?: string;
}
declare const HalfChat: React.FC<HalfChatProps>;
export default HalfChat;
