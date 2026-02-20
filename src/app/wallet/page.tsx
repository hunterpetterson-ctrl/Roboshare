"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Clock, CreditCard, Wallet as WalletIcon } from "lucide-react";

export default function Wallet() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
                    <p className="text-muted-foreground mt-1">Manage your funds and billing history.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-6 text-primary-foreground shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium text-primary-foreground/80 mb-1">Available Balance</p>
                                <h2 className="text-5xl font-bold tracking-tight">$428.50</h2>
                            </div>
                            <WalletIcon className="w-8 h-8 opacity-50" />
                        </div>
                        <div className="mt-8 flex gap-3">
                            <Button variant="secondary" className="gap-2 flex-1">
                                <ArrowDownLeft className="w-4 h-4" />
                                Add Funds
                            </Button>
                            <Button variant="secondary" className="gap-2 flex-1 outline-white bg-transparent border-white/20 text-white hover:bg-white/10">
                                <ArrowUpRight className="w-4 h-4" />
                                Withdraw
                            </Button>
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl p-6 border shadow-sm flex flex-col justify-center items-center text-center">
                        <Clock className="w-10 h-10 text-green-500 mb-3" />
                        <h3 className="text-2xl font-bold">12 hrs</h3>
                        <p className="text-sm text-muted-foreground">Donated Time Earned</p>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-bold">Recent Transactions</h3>
                    <div className="bg-card rounded-2xl border overflow-hidden shadow-sm">
                        <div className="divide-y">
                            {[
                                { title: "Rented Atlas Helper", type: "expense", amount: "-$45.00", date: "Today, 2:30 PM", icon: CreditCard },
                                { title: "Share Cost: Agri-Harvester Max", type: "expense", amount: "-$60.00", date: "Yesterday", icon: CreditCard },
                                { title: "Earnings: Garden Bot 3000", type: "income", amount: "+$25.00", date: "Feb 18, 2026", icon: ArrowDownLeft },
                                { title: "Deposited Funds", type: "income", amount: "+$200.00", date: "Feb 15, 2026", icon: WalletIcon },
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-muted'}`}>
                                            <tx.icon className={`w-5 h-5 ${tx.type === 'income' ? 'text-green-600' : 'text-muted-foreground'}`} />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{tx.title}</p>
                                            <p className="text-sm text-muted-foreground">{tx.date}</p>
                                        </div>
                                    </div>
                                    <span className={`font-bold ${tx.type === 'income' ? 'text-green-600' : ''}`}>
                                        {tx.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
