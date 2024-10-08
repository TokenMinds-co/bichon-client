const IDL = {
  version: "1.0.0",
  name: "ocr2",
  constants: [
    {
      name: "MAX_ORACLES",
      type: {
        defined: "usize",
      },
      value: "19",
    },
    {
      name: "DIGEST_SIZE",
      type: {
        defined: "usize",
      },
      value: "32",
    },
  ],
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "requesterAccessController",
          isMut: false,
          isSigner: false,
        },
        {
          name: "billingAccessController",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "minAnswer",
          type: "i128",
        },
        {
          name: "maxAnswer",
          type: "i128",
        },
      ],
    },
    {
      name: "close",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "transferOwnership",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "proposedOwner",
          type: "publicKey",
        },
      ],
    },
    {
      name: "acceptOwnership",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "createProposal",
      accounts: [
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "offchainConfigVersion",
          type: "u64",
        },
      ],
    },
    {
      name: "writeOffchainConfig",
      accounts: [
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "offchainConfig",
          type: "bytes",
        },
      ],
    },
    {
      name: "finalizeProposal",
      accounts: [
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "closeProposal",
      accounts: [
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "acceptProposal",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "digest",
          type: "bytes",
        },
      ],
    },
    {
      name: "proposeConfig",
      accounts: [
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "newOracles",
          type: {
            vec: {
              defined: "NewOracle",
            },
          },
        },
        {
          name: "f",
          type: "u8",
        },
      ],
    },
    {
      name: "proposePayees",
      accounts: [
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "tokenMint",
          type: "publicKey",
        },
        {
          name: "payees",
          type: {
            vec: "publicKey",
          },
        },
      ],
    },
    {
      name: "setRequesterAccessController",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "accessController",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "requestNewRound",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "accessController",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setBillingAccessController",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "accessController",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setBilling",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "accessController",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "observationPaymentGjuels",
          type: "u32",
        },
        {
          name: "transmissionPaymentGjuels",
          type: "u32",
        },
      ],
    },
    {
      name: "withdrawFunds",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "accessController",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amountGjuels",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawPayment",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payee",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "payOracles",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "accessController",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "transferPayeeship",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "transmitter",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payee",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposedPayee",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "acceptPayeeship",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "transmitter",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposedPayee",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "LatestConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "configCount",
            type: "u32",
          },
          {
            name: "configDigest",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "blockNumber",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "LinkAvailableForPayment",
      type: {
        kind: "struct",
        fields: [
          {
            name: "availableBalance",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "OracleObservationCount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "count",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "Proposal",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "state",
            type: "u8",
          },
          {
            name: "f",
            type: "u8",
          },
          {
            name: "padding0",
            type: "u8",
          },
          {
            name: "padding1",
            type: "u32",
          },
          {
            name: "tokenMint",
            type: "publicKey",
          },
          {
            name: "oracles",
            type: {
              defined: "ProposedOracles",
            },
          },
          {
            name: "offchainConfig",
            type: {
              defined: "OffchainConfig",
            },
          },
        ],
      },
    },
    {
      name: "State",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "vaultNonce",
            type: "u8",
          },
          {
            name: "padding0",
            type: "u16",
          },
          {
            name: "padding1",
            type: "u32",
          },
          {
            name: "feed",
            type: "publicKey",
          },
          {
            name: "config",
            type: {
              defined: "Config",
            },
          },
          {
            name: "offchainConfig",
            type: {
              defined: "OffchainConfig",
            },
          },
          {
            name: "oracles",
            type: {
              defined: "Oracles",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Billing",
      type: {
        kind: "struct",
        fields: [
          {
            name: "observationPaymentGjuels",
            type: "u32",
          },
          {
            name: "transmissionPaymentGjuels",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "Oracles",
      type: {
        kind: "struct",
        fields: [
          {
            name: "xs",
            type: {
              array: [
                {
                  defined: "Oracle",
                },
                19,
              ],
            },
          },
          {
            name: "len",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ProposedOracle",
      type: {
        kind: "struct",
        fields: [
          {
            name: "transmitter",
            type: "publicKey",
          },
          {
            name: "signer",
            type: {
              defined: "SigningKey",
            },
          },
          {
            name: "padding",
            type: "u32",
          },
          {
            name: "payee",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "ProposedOracles",
      type: {
        kind: "struct",
        fields: [
          {
            name: "xs",
            type: {
              array: [
                {
                  defined: "ProposedOracle",
                },
                19,
              ],
            },
          },
          {
            name: "len",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "OffchainConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u64",
          },
          {
            name: "xs",
            type: {
              array: ["u8", 4096],
            },
          },
          {
            name: "len",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Config",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "proposedOwner",
            type: "publicKey",
          },
          {
            name: "tokenMint",
            type: "publicKey",
          },
          {
            name: "tokenVault",
            type: "publicKey",
          },
          {
            name: "requesterAccessController",
            type: "publicKey",
          },
          {
            name: "billingAccessController",
            type: "publicKey",
          },
          {
            name: "minAnswer",
            type: "i128",
          },
          {
            name: "maxAnswer",
            type: "i128",
          },
          {
            name: "f",
            type: "u8",
          },
          {
            name: "round",
            type: "u8",
          },
          {
            name: "padding0",
            type: "u16",
          },
          {
            name: "epoch",
            type: "u32",
          },
          {
            name: "latestAggregatorRoundId",
            type: "u32",
          },
          {
            name: "latestTransmitter",
            type: "publicKey",
          },
          {
            name: "configCount",
            type: "u32",
          },
          {
            name: "latestConfigDigest",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "latestConfigBlockNumber",
            type: "u64",
          },
          {
            name: "billing",
            type: {
              defined: "Billing",
            },
          },
        ],
      },
    },
    {
      name: "SigningKey",
      type: {
        kind: "struct",
        fields: [
          {
            name: "key",
            type: {
              array: ["u8", 20],
            },
          },
        ],
      },
    },
    {
      name: "Oracle",
      type: {
        kind: "struct",
        fields: [
          {
            name: "transmitter",
            type: "publicKey",
          },
          {
            name: "signer",
            type: {
              defined: "SigningKey",
            },
          },
          {
            name: "payee",
            type: "publicKey",
          },
          {
            name: "proposedPayee",
            type: "publicKey",
          },
          {
            name: "fromRoundId",
            type: "u32",
          },
          {
            name: "paymentGjuels",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "NewOracle",
      type: {
        kind: "struct",
        fields: [
          {
            name: "signer",
            type: {
              array: ["u8", 20],
            },
          },
          {
            name: "transmitter",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "SetConfig",
      fields: [
        {
          name: "configDigest",
          type: {
            array: ["u8", 32],
          },
          index: false,
        },
        {
          name: "f",
          type: "u8",
          index: false,
        },
        {
          name: "signers",
          type: {
            vec: {
              array: ["u8", 20],
            },
          },
          index: false,
        },
      ],
    },
    {
      name: "SetBilling",
      fields: [
        {
          name: "observationPaymentGjuels",
          type: "u32",
          index: false,
        },
        {
          name: "transmissionPaymentGjuels",
          type: "u32",
          index: false,
        },
      ],
    },
    {
      name: "RoundRequested",
      fields: [
        {
          name: "configDigest",
          type: {
            array: ["u8", 32],
          },
          index: false,
        },
        {
          name: "requester",
          type: "publicKey",
          index: false,
        },
        {
          name: "epoch",
          type: "u32",
          index: false,
        },
        {
          name: "round",
          type: "u8",
          index: false,
        },
      ],
    },
    {
      name: "NewTransmission",
      fields: [
        {
          name: "roundId",
          type: "u32",
          index: true,
        },
        {
          name: "configDigest",
          type: {
            array: ["u8", 32],
          },
          index: false,
        },
        {
          name: "answer",
          type: "i128",
          index: false,
        },
        {
          name: "transmitter",
          type: "u8",
          index: false,
        },
        {
          name: "observationsTimestamp",
          type: "u32",
          index: false,
        },
        {
          name: "observerCount",
          type: "u8",
          index: false,
        },
        {
          name: "observers",
          type: {
            array: ["u8", 19],
          },
          index: false,
        },
        {
          name: "juelsPerLamport",
          type: "u64",
          index: false,
        },
        {
          name: "reimbursementGjuels",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Unauthorized",
      msg: "Unauthorized",
    },
    {
      code: 6001,
      name: "InvalidInput",
      msg: "Invalid input",
    },
    {
      code: 6002,
      name: "TooManyOracles",
      msg: "Too many oracles",
    },
    {
      code: 6003,
      name: "StaleReport",
      msg: "Stale report",
    },
    {
      code: 6004,
      name: "DigestMismatch",
      msg: "Digest mismatch",
    },
    {
      code: 6005,
      name: "WrongNumberOfSignatures",
      msg: "Wrong number of signatures",
    },
    {
      code: 6006,
      name: "Overflow",
      msg: "Overflow",
    },
    {
      code: 6007,
      name: "MedianOutOfRange",
      msg: "Median out of range",
    },
    {
      code: 6008,
      name: "DuplicateSigner",
      msg: "Duplicate signer",
    },
    {
      code: 6009,
      name: "DuplicateTransmitter",
      msg: "Duplicate transmitter",
    },
    {
      code: 6010,
      name: "PayeeAlreadySet",
      msg: "Payee already set",
    },
    {
      code: 6011,
      name: "PayeeOracleMismatch",
      msg: "Payee and Oracle length mismatch",
    },
    {
      code: 6012,
      name: "InvalidTokenAccount",
      msg: "Invalid Token Account",
    },
    {
      code: 6013,
      name: "UnauthorizedSigner",
      msg: "Oracle signer key not found",
    },
    {
      code: 6014,
      name: "UnauthorizedTransmitter",
      msg: "Oracle transmitter key not found",
    },
  ],
} as const;
