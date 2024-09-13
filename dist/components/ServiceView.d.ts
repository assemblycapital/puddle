import { default as React } from 'react';
import { ServiceConnectionStatus } from '..';

interface ServiceViewProps {
    onServiceMessage?: (msg: any) => void;
    onClientMessage?: (msg: any) => void;
    Element?: React.ComponentType<{}>;
    processName: string;
    ourNode: string;
    websocketUrl?: string;
    enableChatSounds?: boolean;
    fullscreen?: boolean;
    paramServiceId: string;
}
export declare const renderConnectionStatus: (serviceConnectionStatus: ServiceConnectionStatus | null, isConnectingTooLong: boolean) => React.ReactNode;
declare const ServiceView: React.FC<ServiceViewProps>;
export default ServiceView;
