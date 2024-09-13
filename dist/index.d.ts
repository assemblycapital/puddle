export { useServiceStore } from './store/service';
export * from './utils';
export * from './components/index';
export declare enum ConnectionStatusType {
    Connecting = 0,
    Connected = 1,
    Disconnected = 2
}
export type ConnectionStatus = {
    status: ConnectionStatusType;
    timestamp: number;
};
export declare class ServiceConnectionStatus {
    status: ServiceConnectionStatusType;
    timestamp: number;
    constructor(status: ServiceConnectionStatusType, timestamp: number);
    toString(): string;
}
export declare enum ServiceConnectionStatusType {
    Connecting = 0,
    Connected = 1,
    Disconnected = 2,
    ServiceDoesNotExist = 3,
    Kicked = 4,
    ServiceDeleted = 5,
    AccessDenied = 6
}
interface ConstructorArgs {
    our: {
        node: string;
        process: string;
    };
    websocket_url: string;
    onOpen?: (api: any) => void;
    onClose?: () => void;
    serviceId?: string;
    onServiceConnectionStatusChange?: (api: any) => void;
    onServiceMetadataChange?: (api: any) => void;
    onFullServiceMetadataChange?: (api: any) => void;
    onServiceMessage?: (message: any) => void;
    onClientMessage?: (message: any) => void;
    onProcessMessage?: (message: any) => void;
    onPeerMapChange?: (api: any) => void;
    onLocalServicesChange?: (api: any) => void;
    disableAutoReconnect?: boolean;
}
export declare class ServiceApi {
    private api;
    connectionStatus: ConnectionStatus;
    our: {
        node: string;
        process: string;
    };
    websocket_url: string;
    serviceId: string | null;
    serviceMetadata: PublicServiceMetadata | null;
    fullServiceMetadata: ServiceMetadata | null;
    serviceConnectionStatus: ServiceConnectionStatus | null;
    peerMap: PeerMap;
    localServices: any[];
    private onOpen;
    private onClose;
    private onServiceConnectionStatusChange;
    private onServiceMetadataChange;
    private onFullServiceMetadataChange;
    private onServiceMessage;
    private onClientMessage;
    private onProcessMessage;
    private onPeerMapChange;
    private onLocalServicesChange;
    private autoReconnectEnabled;
    private reconnectInterval;
    private reconnectAttempts;
    private heartbeatInterval;
    constructor({ our, websocket_url, onOpen, onClose, serviceId, onServiceConnectionStatusChange, onServiceMetadataChange, onFullServiceMetadataChange, onServiceMessage, onClientMessage, onProcessMessage, onPeerMapChange, onLocalServicesChange, disableAutoReconnect, }: ConstructorArgs);
    private initialize;
    private startReconnectInterval;
    private stopReconnectInterval;
    private setConnectionStatus;
    private setServiceConnectionStatus;
    sendRequest(json: any): void;
    sendToService(data: any): void;
    sendToProcess(data: any): void;
    sendHeartbeat(): void;
    unsubscribeService(): void;
    setService(fullServiceId: string): void;
    createService(options: ServiceCreationOptions): void;
    deleteService(name: string): void;
    editService(serviceId: string, options: ServiceEditOptions): void;
    requestMyServices(): void;
    requestPeer(node: string): void;
    requestPeerList(nodeList: string[]): void;
    requestKnownPeers(): void;
    private updateHandler;
}
export type PeerMap = Map<string, Peer>;
export type Address = string;
export interface ServiceID {
    name: string;
    address: Address;
}
export declare class ServiceID {
    name: string;
    address: Address;
    constructor(name: string, address: Address);
    toShortString(): string;
    toString(): string;
    hostNode(): string;
    process(): string;
    static fromString(s: string): ServiceID | null;
}
export interface Service {
    id: ServiceID;
    meta: ServiceMetadata;
}
export declare class Service {
    id: ServiceID;
    meta: ServiceMetadata;
    constructor(id: ServiceID, meta: ServiceMetadata);
    static new(name: string, address: Address): Service;
}
export interface PublicService {
    id: ServiceID;
    meta: PublicServiceMetadata;
}
export interface ServiceMetadata {
    title?: string;
    description?: string;
    last_sent_presence: number | null;
    subscribers: string[];
    user_presence: Map<string, number>;
    access: ServiceAccess;
    visibility: ServiceVisibility;
    whitelist: string[];
    publish_user_presence: boolean;
    publish_subscribers: boolean;
    publish_subscriber_count: boolean;
    publish_whitelist: boolean;
}
export declare class ServiceMetadata {
    constructor({ title, description, last_sent_presence, subscribers, user_presence, access, visibility, whitelist, publish_user_presence, publish_subscribers, publish_subscriber_count, publish_whitelist }: Partial<ServiceMetadata>);
    static new(): ServiceMetadata;
}
export declare enum ServiceAccess {
    Public = "Public",
    Whitelist = "Whitelist",
    HostOnly = "HostOnly"
}
export declare enum ServiceVisibility {
    Visible = "Visible",
    HostOnly = "HostOnly",
    Hidden = "Hidden"
}
export interface JsonService {
    id: {
        name: string;
        address: string;
    };
    meta: {
        title?: string;
        description?: string;
        last_sent_presence: number | null;
        subscribers: string[];
        user_presence: {
            [key: string]: number;
        };
        access: ServiceAccess;
        visibility: ServiceVisibility;
        whitelist: string[];
        publish_user_presence: boolean;
        publish_subscribers: boolean;
        publish_subscriber_count: boolean;
        publish_whitelist: boolean;
    };
}
export interface ServiceCreationOptions {
    serviceName: string;
    processName: string;
    access: ServiceAccess;
    visibility: ServiceVisibility;
    whitelist: string[];
    title?: string;
    description?: string;
    publishUserPresence: boolean;
    publishSubscribers: boolean;
    publishSubscriberCount: boolean;
    publishWhitelist: boolean;
}
export interface ServiceEditOptions {
    title?: string;
    description?: string;
    access?: ServiceAccess;
    visibility?: ServiceVisibility;
    whitelist?: string[];
    publishUserPresence?: boolean;
    publishSubscribers?: boolean;
    publishSubscriberCount?: boolean;
    publishWhitelist?: boolean;
}
export declare function serviceFromJson(jsonService: JsonService): Service;
export declare function serviceMetadataFromJson(jsonMeta: JsonService['meta']): ServiceMetadata;
export declare function publicServiceFromJson(jsonService: any): PublicService;
export declare function publicServiceMetadataFromJson(jsonMeta: any): PublicServiceMetadata;
export interface PublicServiceMetadata {
    title?: string;
    description?: string;
    last_sent_presence: number | null;
    subscribers?: string[];
    subscriber_count?: number;
    user_presence?: Map<string, number>;
    access: ServiceAccess;
    visibility: ServiceVisibility;
    whitelist?: string[];
}
export declare enum PeerActivityType {
    Offline = "Offline",
    Private = "Private",
    Online = "Online",
    RecentlyOnline = "RecentlyOnline"
}
export type PeerActivity = {
    type: PeerActivityType.Private;
} | {
    type: PeerActivityType.Online;
    timestamp: number;
} | {
    type: PeerActivityType.Offline;
    timestamp: number;
};
export declare function activityFromJson(jsonActivity: any): PeerActivity;
export declare enum ActivitySetting {
    Public = "Public",
    Private = "Private"
}
export declare enum NameColor {
    Red = "Red",
    Blue = "Blue",
    Green = "Green",
    Orange = "Orange",
    Purple = "Purple",
    Default = "Default"
}
export interface Profile {
    bio: string;
    nameColor: NameColor;
    pfp?: string;
}
export declare function profileFromJson(jsonProfile: any): Profile;
export declare class Profile {
    bio: string;
    nameColor: NameColor;
    pfp?: string;
    constructor(bio: string, nameColor: NameColor, pfp?: string);
    static new(node: string): Profile;
}
export interface PeerData {
    hostedServices: PublicService[];
    profile: Profile;
    activity: PeerActivity;
}
export declare class Peer {
    node: string;
    peerData: PeerData | null;
    outstandingRequest: number | null;
    lastUpdated: number | null;
    constructor(node: string, peerData?: PeerData | null, outstandingRequest?: number | null, lastUpdated?: number | null);
    static new(node: string): Peer;
}
export declare function peerFromJson(json: any): Peer;
export declare const dfLinkRegex: RegExp;
export declare function dfLinkToRealLink(dfLink: string, baseOrigin: string): string;
export declare function nodeProfileLink(node: string, baseOrigin: string): string;
export declare const DEFAULT_PFP = "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/dartfrog256_small_nobg.png";
export declare function getPeerPfp(peer: Peer | undefined): string;
export declare function getPeerNameColor(peer: Peer | undefined): string;
export declare function getClassForNameColor(nameColor: NameColor): string;
export declare function serviceMetadataToEditOptions(metadata: ServiceMetadata): ServiceEditOptions;
export declare function getServiceRecencyText(service: Service): string;
export declare function getRecencyText(diff: number): string;
export declare function getAllServicesFromPeerMap(peerMap: PeerMap): PublicService[];
export declare function sortServices(services: any): any;
export declare const getUniqueServices: (services: Service[], publicServices: PublicService[]) => PublicService[];
