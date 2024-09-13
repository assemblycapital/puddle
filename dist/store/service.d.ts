import { PeerMap, PublicServiceMetadata, Service, ServiceApi, ServiceConnectionStatus, ServiceCreationOptions, ServiceEditOptions, ServiceMetadata } from '..';

export type ChatState = {
    messages: Map<number, ChatMessage>;
    lastUpdateType: "history" | "message";
};
export type ChatMessage = {
    id: number;
    from: string;
    msg: string;
    time: number;
};
export interface ServiceStore {
    serviceId: string | null;
    setServiceId: (service: string) => void;
    serviceMetadata: PublicServiceMetadata | null;
    setServiceMetadata: (meta: PublicServiceMetadata) => void;
    serviceConnectionStatus: ServiceConnectionStatus | null;
    setServiceConnectionStatus: (status: ServiceConnectionStatus) => void;
    localServices: Service[];
    setLocalServices: (services: Service[]) => void;
    peerMap: PeerMap;
    setPeerMap: (newPeerMap: PeerMap) => void;
    newPeer: (node: string) => void;
    api: ServiceApi | null;
    setApi: (api: ServiceApi) => void;
    createService: (options: ServiceCreationOptions) => void;
    deleteService: (name: string) => void;
    requestPeer: (node: string) => void;
    requestMyServices: () => void;
    chatState: ChatState;
    setChatState: (chatState: ChatState) => void;
    addChatMessage: (message: ChatMessage) => void;
    setChatHistory: (history: ChatMessage[]) => void;
    chatSoundsEnabled: boolean;
    setChatSoundsEnabled: (enabled: boolean) => void;
    isClientConnected: boolean;
    setIsClientConnected: (isConnected: boolean) => void;
    sendChat: (text: string) => void;
    get: () => ServiceStore;
    set: (partial: ServiceStore | Partial<ServiceStore>) => void;
    editService: (serviceId: string, options: ServiceEditOptions) => void;
    fullServiceMetadata: ServiceMetadata | null;
    setFullServiceMetadata: (metadata: ServiceMetadata | null) => void;
}
export declare const useServiceStore: import('zustand').UseBoundStore<import('zustand').StoreApi<ServiceStore>>;
export default useServiceStore;
