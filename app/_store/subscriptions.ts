import { Subscription } from "rxjs";
import {
  DataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";

import { fetchBalance, userSlice, WalletData } from "./userSlice";
import { AppStore } from "./store";

export type RDT = ReturnType<typeof RadixDappToolkit>;

let rdt: null | RDT = null;
let gatewayApiClient: null | GatewayApiClient = null;

export function getRdtOrThrow() {
  if (!rdt) {
    throw new Error("RDT initialization failed");
  }
  return rdt;
}

export function getGatewayApiClientOrThrow() {
  if (!gatewayApiClient) {
    throw new Error("GatewayApiClient initialization failed");
  }
  return gatewayApiClient;
}

let subs: Subscription[] = [];

export function initializeSubscriptions(store: AppStore) {
  // Get network from environment
  const networkId = {
    mainnet: RadixNetwork.Mainnet,
    stokenet: RadixNetwork.Stokenet,
  }[process.env.NEXT_PUBLIC_NETWORK!] || RadixNetwork.Stokenet;

  // Initialize rdt instance (specify to which app it connects)
  rdt = RadixDappToolkit({
    dAppDefinitionAddress:
      "account_tdx_2_129kev9w27tsl7qjg0dlyze70kxnlzycs8v2c85kzec40gg8mt73f7y",
    networkId: networkId,
    featureFlags: ["ExperimentalMobileSupport"],
  });
  
  // Single VS multi account support
  // -> accounts().exactly(1) -> single account
  // -> accounts().atLeast(1) -> multi account
  rdt.walletApi.setRequestData(
    DataRequestBuilder.accounts().exactly(1)
  );
  
  // Initialize gateway api client
  gatewayApiClient = GatewayApiClient.initialize(
    rdt.gatewayApi.clientConfig
  );
  
  // Set connect button theme
  rdt.buttonApi.setTheme("white");
  
  // Subscribe to connect button updates (if user loggs out, updates data sharing etc...)
  subs.push(
    rdt.walletApi.walletData$.subscribe((walletData: WalletData) => {
      const data: WalletData = JSON.parse(JSON.stringify(walletData));
      store.dispatch(userSlice.actions.setWalletData(data));
      // Fetch XRD balance after login
      // TODO(dcts): replace hardcoded tokenAddress with env tokenaddress of XRD
      const xrdStokenetAddress = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc";
      store.dispatch(fetchBalance(xrdStokenetAddress));
    })
  );
}

export function unsubscribeAll() {
  subs.forEach((sub) => {
    sub.unsubscribe();
  });
  subs = [];
}
