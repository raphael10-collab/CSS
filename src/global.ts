export {};
declare global {
  interface Window {
    api: {
      send: (channel: string, ...arg: any) => void;
      receive: (
        channel: string,
        func: (event: any, ...arg: any) => void
      ) => void;
      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
      // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
      electronIpcSendTo: (
        window_id: string,
        channel: string,
        ...arg: any
      ) => void;
      electronIpcSend: (channel: string, ...arg: any) => void;
      giveMeAStream: (eventId: string) => void;
      electronIpcOn: (
        channel: string,
        listener: (event: any, ...arg: any) => void
      ) => void;
      electronIpcSendSync: (channel: string, ...arg: any) => void;
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
      electronIpcInvoke: (channel: string, ...arg: any) => void;
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererpostmessagechannel-message-transfer
      electronIpcPostMessage: (channel: string, message: any, transfer?: MessagePort[]) => void;


      electronIpcOnce: (
        channel: string,
        listener: (event: any, ...arg: any) => void
      ) => void;
      electronIpcRemoveListener: (
        channel: string,
        listener: (event: any, ...arg: any) => void
      ) => void;
      electronIpcRemoveAllListeners: (channel: string) => void;
      setFullscreen: (flag) => void;
    };
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
  }
}
