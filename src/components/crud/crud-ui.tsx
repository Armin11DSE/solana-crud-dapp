'use client'

import { PublicKey } from '@solana/web3.js'
import { useState } from 'react'
import { useCrudProgram, useCrudProgramAccount } from './crud-data-access'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useWallet } from '@solana/wallet-adapter-react'

export function CrudCreate() {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { createEntry } = useCrudProgram();
  const { publicKey } = useWallet();

  const isFormValid = title.trim() !== '' && message.trim() !== '';

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createEntry.mutateAsync({ title, message, owner: publicKey });
    }
  }

  if (!publicKey) {
    return <p> Connect your Wallet.</p>
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter the title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          placeholder="Write your message..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition min-h-[120px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div>
        <button
          className="w-full py-2 px-4 bg-primary text-black font-semibold hover:cursor-pointer rounded-xl transition disabled:opacity-50 disabled:cursor-auto"
          onClick={handleSubmit}
          disabled={createEntry.isPending || !isFormValid}
        >
          {createEntry.isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  )
}

export function CrudList() {
  const { accounts, getProgramAccount } = useCrudProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <CrudCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function CrudCard({ account }: { account: PublicKey }) {
  const { accountQuery, updateEntry, deleteEntry } = useCrudProgramAccount({
    account,
  })

  const { publicKey } = useWallet();

  const [message, setMessage] = useState<string>('');
  const title = accountQuery.data?.title;

  const isFormValid = message.trim() !== "";

  const handleSubmit = () => {
    if (publicKey && isFormValid && title) {
      updateEntry.mutateAsync({ title, message, owner: publicKey });
    }
  }

  const handleDelete = () => {
    const title = accountQuery.data?.title;
    if (title) {
      deleteEntry.mutateAsync(title);
    }
  }

  if (!publicKey) {
    return <p> Connect your Wallet.</p>
  }

  return accountQuery.isLoading ? (
    <div className="flex justify-center items-center py-12">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  ) : (
    <Card className="max-w-md mx-auto p-6 rounded-2xl shadow-md bg-cyan-950 space-y-4">
      <CardHeader className="pb-0">
        <CardTitle
          className="text-xl font-bold cursor-pointer hover:underline transition"
          onClick={() => accountQuery.refetch()}
        >
          {accountQuery.data?.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 break-all">
          {account.toString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <p className="text-gray-500">{accountQuery.data?.message}</p>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Edit Message</label>
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition min-h-[100px]"
          />
        </div>

        <div className="flex justify-between gap-4 pt-2">
          <button
            className="flex-1 py-2 px-4 bg-blue-950 text-white font-semibold rounded-xl hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-auto"
            onClick={handleSubmit}
            disabled={updateEntry.isPending || !isFormValid}
          >
            {updateEntry.isPending ? "Updating..." : "Update"}
          </button>

          <button
            className="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={deleteEntry.isPending}
          >
            {deleteEntry.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </CardContent>
    </Card>
  );

}
