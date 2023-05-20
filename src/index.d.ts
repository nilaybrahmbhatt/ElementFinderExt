declare namespace chrome {
  export namespace runtime {
    function sendMessage(
      message: any,
      callback?: (response: any) => void
    ): void;
    export const onMessage: {
      addListener(
        callback: (message: any, sender: any, sendResponse: any) => void
      ): void;
    };
  }
  export namespace tabs {
    export function query(
      queryInfo: chrome.tabs.QueryInfo,
      callback?: (result: chrome.tabs.Tab[]) => void
    ): void;
    export function sendMessage(
      tabId: number,
      message: any,
      options?: chrome.tabs.MessageSendOptions,
      responseCallback?: (response: any) => void
    ): void;
  }
}
