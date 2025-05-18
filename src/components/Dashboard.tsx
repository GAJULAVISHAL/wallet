import { generateMnemonic,  mnemonicToSeedSync, validateMnemonic } from "bip39";
import { useState, useEffect } from "react";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Plus } from "lucide-react";

type Account = {
    account: {
        ethereum: {
            publicKey: string;
            privateKey: string;
        };
        solana: {
            publicKey: string;
            privateKey: string;
        }
    }
}

export const Dashboard = () => {
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(""));
    const [accounts, setAccounts] = useState<Account[]>([]);

    // Effect to log accounts whenever the accounts state changes
    useEffect(() => {
        console.log("Accounts:", accounts);
    }, [accounts]);

    const generateMnemonicWords = () => {
        const mnemonic = generateMnemonic(); // 12 words
        const mnemonicArray = mnemonic.split(" ");
        setMnemonicWords(mnemonicArray);
        console.log(mnemonicArray);

        // Reset accounts when generating new mnemonic
        setAccounts([]);

        generateWalletFromMnemonic(mnemonic, accounts.length);

    };

    const generateWalletFromMnemonic = (mnemonic: string, accountIndex: number) => {
        if (!mnemonic.trim() || !validateMnemonic(mnemonic)) {
            console.error("No valid mnemonic available");
            return;
        }
        
        try {
            console.log("Generating wallet from mnemonic:", mnemonic);
            const seedbuffer = mnemonicToSeedSync(mnemonic);
            console.log("Seed:", seedbuffer.toString("hex"));
            console.log("Account Index:", accountIndex);

            // Solana wallet generation
            const solanaPath = `m/44'/501'/${accountIndex}'/0'`;
            const solderivedSeed = derivePath(solanaPath, seedbuffer.toString("hex"));
            if (!solderivedSeed) {
                console.error("No derived seed available");
                return;
            }
            const key = solderivedSeed.key;
            const secret = nacl.sign.keyPair.fromSeed(key).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            console.log("Solana Public Key:", keypair.publicKey.toBase58());
            console.log(bs58.encode(secret));

        } catch (error) {

            console.error("Error generating wallet from mnemonic:", error);
            return;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-lg">
            <button
                onClick={generateMnemonicWords}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
            >
                Generate Wallet
            </button>

            {mnemonicWords.length > 0 && mnemonicWords[0] !== "" && (
                <div className="mt-4 mb-6">
                    <h2 className="text-lg font-semibold mb-2">Seed Phrase</h2>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {mnemonicWords.map((word, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 px-2 py-1 rounded shadow text-sm"
                            >
                                {index + 1}. {word}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {mnemonicWords[0] !== "" && (
                <button
                    onClick={() => generateWalletFromMnemonic(mnemonicWords.join(" "), accounts.length)}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold flex items-center gap-2"
                >
                    <Plus size={16} />
                    Add Account
                </button>
            )}

            
        </div>
    );
};