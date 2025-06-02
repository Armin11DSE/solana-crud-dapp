// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CrudIDL from '../target/idl/crud.json'
import type { Crud } from '../target/types/crud'

export { Crud, CrudIDL }

export const CRUD_PROGRAM_ID = new PublicKey(CrudIDL.address)

export function getCrudProgram(provider: AnchorProvider, address?: PublicKey): Program<Crud> {
  return new Program({ ...CrudIDL, address: address ? address.toBase58() : CrudIDL.address } as Crud, provider)
}

export function getCrudProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return new PublicKey('2MQekGaU8sjDA2fotoL2dwtuzMbq5XqYRjTB3Xm61kZp')
    case 'mainnet-beta':
    default:
      return CRUD_PROGRAM_ID
  }
}
