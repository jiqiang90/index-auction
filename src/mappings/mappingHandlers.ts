import {Auction} from "../types/models/Auction";
import {SubstrateEvent} from "@subql/types";
import {Balance} from '@polkadot/types/interfaces';


export async function handleAuction(event: SubstrateEvent): Promise<void> {
    const {event: {data: [from, paraId, amount, firstSlot, lastSlot]}} = event;
    const auction = new Auction(paraId.toString());
    auction.bidder = from.toString();
    auction.balance =  (amount as Balance).toBigInt();
    auction.leaseStart = Number(firstSlot.toString());
    auction.leaseEnd = Number(lastSlot.toString());
    await auction.save();
}

