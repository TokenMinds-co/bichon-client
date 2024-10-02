"use client";

import ConnectWallet from "./ConnectWallet";

const AppConnectButton = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center space-y-3">
      <ConnectWallet label="Connect Wallet" />

      {/* {isConnected && (
        <div className="text-white text-left mt-10">
          <h2>Address: {address}</h2>
          <h2>Chain ID: {chainId}</h2>
        </div>
      )} */}
    </div>
  );
};

export default AppConnectButton;
